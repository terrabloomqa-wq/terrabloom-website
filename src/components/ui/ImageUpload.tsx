'use client';

import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { UploadCloud, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // 1. Compress Image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);

      // 2. Upload to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing in .env.local');
      }

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (err: any) {
      console.error('Image upload error:', err);
      setError(err.message || 'Error uploading image');
    } finally {
      setUploading(false);
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
        <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
          <img src={value} alt="Uploaded preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-white text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-colors shadow-sm cursor-pointer"
              title="Remove image"
            >
              <X className="w-5 h-5" />
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
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <span className="text-sm font-medium">Compressing & Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <div className="p-3 bg-white rounded-full shadow-sm">
                <UploadCloud className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-700">Click to upload image</span>
              <span className="text-xs text-slate-400">Optimized automatically</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
