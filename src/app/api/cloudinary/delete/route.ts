import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function getPublicId(imageUrl: string, cloudName: string): string | null {
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== 'res.cloudinary.com') return null;

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] !== cloudName || parts[1] !== 'image' || parts[2] !== 'upload') return null;

    const uploadParts = parts.slice(3);
    const versionIndex = uploadParts.findIndex((part) => /^v\d+$/.test(part));
    const publicIdParts = (versionIndex >= 0 ? uploadParts.slice(versionIndex + 1) : uploadParts)
      .map((part) => decodeURIComponent(part));
    if (!publicIdParts.length) return null;

    const lastPartIndex = publicIdParts.length - 1;
    publicIdParts[lastPartIndex] = publicIdParts[lastPartIndex].replace(/\.[^.]+$/, '');
    return publicIdParts.filter(Boolean).join('/') || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!supabaseUrl || !supabaseKey || !cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: 'Supabase or Cloudinary server configuration is missing.' }, { status: 500 });
  }

  const authorization = request.headers.get('authorization');
  const accessToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!accessToken) {
    return Response.json({ error: 'Admin authentication is required to delete images.' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !user) {
    return Response.json({ error: 'Admin authentication is invalid or expired.' }, { status: 401 });
  }

  let body: { imageUrls?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!Array.isArray(body.imageUrls) || body.imageUrls.length > 10 || !body.imageUrls.every((url) => typeof url === 'string')) {
    return Response.json({ error: 'Provide up to ten image URLs.' }, { status: 400 });
  }

  const publicIds = [...new Set(body.imageUrls
    .map((url) => getPublicId(url, cloudName))
    .filter((publicId): publicId is string => Boolean(publicId)))];

  const failures: string[] = [];
  for (const publicId of publicIds) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const invalidate = 'true';
    try {
      let failureMessage = '';
      for (const algorithm of ['sha1', 'sha256'] as const) {
        const signature = createHash(algorithm)
          .update(`invalidate=${invalidate}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
          .digest('hex');
        const formData = new FormData();
        formData.set('public_id', publicId);
        formData.set('invalidate', invalidate);
        formData.set('timestamp', timestamp);
        formData.set('api_key', apiKey);
        formData.set('signature', signature);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/destroy`, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json() as { result?: string; error?: { message?: string } };
        if (response.ok && (result.result === 'ok' || result.result === 'not found')) {
          failureMessage = '';
          break;
        }

        failureMessage = result.error?.message || `Cloudinary returned ${result.result || response.status}.`;
        if (!failureMessage.toLowerCase().includes('invalid signature')) break;
      }

      if (failureMessage) failures.push(`${publicId}: ${failureMessage}`);
    } catch {
      // Continue attempting the rest so one transient failure doesn't block cleanup.
      failures.push(`${publicId}: Cloudinary could not be reached.`);
    }
  }

  if (failures.length) {
    return Response.json({
      error: `Cloudinary could not delete ${failures.length} image(s). ${failures.join(' ')} Retry deletion to clean up the remaining assets.`,
    }, { status: 502 });
  }

  return Response.json({ deleted: publicIds.length, publicIds });
}
