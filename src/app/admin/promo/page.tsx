'use client';

import React, { useEffect, useState } from 'react';
import { getStoreSettings, updateStoreSettings } from '@/services';
import type { StoreSettings } from '@/types';
import VideoUpload from '@/components/ui/VideoUpload';
import { Video } from 'lucide-react';

export default function AdminPromoPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getStoreSettings();
        setSettings(data);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage('');
    try {
      await updateStoreSettings(settings.id, settings);
      setMessage('Promo section updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage('Error saving. Make sure your database schema is updated.');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return <p className="text-text-muted">Loading promo settings...</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
          <Video className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Promo Video Section</h2>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm mb-6 ${
          message.includes('Error')
            ? 'bg-red-50 text-error border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-slate-800">
            Homepage Promo Video
          </h3>
          <p className="text-sm text-text-muted mb-6">
            Upload a full-width background video. Leave the video empty to hide this section entirely from the homepage.
          </p>

          <div className="space-y-6">
            <VideoUpload
              label="Background Video"
              value={settings.promo_video_url || ''}
              onChange={(url) => setSettings({ ...settings, promo_video_url: url })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors disabled:opacity-60 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Promo Section'}
        </button>
      </form>
    </div>
  );
}
