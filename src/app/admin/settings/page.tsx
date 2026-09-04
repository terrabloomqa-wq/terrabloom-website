'use client';

import React, { useEffect, useState } from 'react';
import { getStoreSettings, updateStoreSettings } from '@/services';
import type { StoreSettings } from '@/types';
import { Store, Phone, Megaphone, Link as LinkIcon, FileText } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminSettingsPage() {
  const { refreshSettings } = useStore();
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
      await refreshSettings();
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage('Error saving settings. Make sure Supabase is configured.');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return <p className="text-text-muted">Loading settings...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Store Settings</h2>

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
        {/* Store Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Store className="w-5 h-5 text-emerald-500" />
            Store Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Store Name</label>
              <input
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tagline</label>
              <input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Phone className="w-5 h-5 text-blue-500" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">WhatsApp Number *</label>
              <input
                required
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="e.g. 97455123456"
              />
              <span className="text-xs text-text-muted">Format: country code + number (e.g. 97455123456)</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Contact Phone</label>
              <input
                value={settings.contact_phone}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="e.g. +974 5512 3456"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address</label>
              <input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Footer About Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <FileText className="w-5 h-5 text-purple-500" />
            Footer Information
          </h3>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Footer About Text</label>
            <textarea
              value={settings.footer_about || ''}
              onChange={(e) => setSettings({ ...settings, footer_about: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm resize-none"
              rows={3}
              placeholder="We create sustainable terrariums that bring a little nature closer to you. Our products are long-lasting, eco-friendly, and sustainable."
            />
            <span className="text-xs text-text-muted">This description will display under the logo in the website footer.</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <LinkIcon className="w-5 h-5 text-indigo-500" />
            Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Instagram URL</label>
              <input
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Facebook URL</label>
              <input
                value={settings.facebook_url || ''}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors disabled:opacity-60 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
