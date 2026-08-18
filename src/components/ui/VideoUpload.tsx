'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Video } from 'lucide-react';

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function VideoUpload({ value, onChange, label = 'Upload Video' }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional size limit (e.g., 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video is too large. Maximum size is 50MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing in .env.local');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      // Using XMLHttpRequest instead of fetch to track upload progress
      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentCompleted = Math.round((event.loaded / event.total) * 100);
            setProgress(percentCompleted);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));
        xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
      xhr.send(formData);

      const data: any = await uploadPromise;
      onChange(data.secure_url);
    } catch (err: any) {
      console.error('Video upload error:', err);
      setError(err.message || 'Error uploading video');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset input
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label} *</label>
      
      {error && (
        <p className="text-xs text-rose-500 bg-rose-50 p-2 rounded-md">{error}</p>
      )}

      {value ? (
        <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
          <video 
            src={value} 
            className="w-full h-48 object-cover opacity-80" 
            controls 
            playsInline
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-white/90 text-rose-600 p-2 rounded-full hover:bg-white transition-colors shadow-sm cursor-pointer"
              title="Remove video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`relative flex flex-col items-center justify-center w-full max-w-sm h-48 border-2 border-dashed rounded-xl transition-colors
            ${uploading ? 'bg-slate-50 border-slate-300' : 'bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-emerald-400 cursor-pointer'}
          `}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-3 text-slate-500 w-full px-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">Uploading... {progress}%</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500 text-center px-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <Video className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-700">Click to upload video</span>
              <span className="text-xs text-slate-400">MP4, WebM up to 50MB</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
