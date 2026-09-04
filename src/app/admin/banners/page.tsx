'use client';

import React, { useEffect, useState } from 'react';
import { getAllBanners, createBanner, updateBanner, deleteBanner } from '@/services';
import type { HeroBanner } from '@/types';
import ImageUpload from '@/components/ui/ImageUpload';
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);

  // Delete modal state
  const [deletingBanner, setDeletingBanner] = useState<HeroBanner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    mobile_image_url: '',
    badge_text: '',
    cta_text: 'Shop Terrariums',
    cta_link: '/shop',
    display_order: 1,
    active: true,
  });

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    try {
      const data = await getAllBanners();
      setBanners(data);
    } catch (err) {
      console.error('Error loading banners:', err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      title: '',
      subtitle: '',
      image_url: '',
      mobile_image_url: '',
      badge_text: '',
      cta_text: 'Shop Terrariums',
      cta_link: '/shop',
      display_order: banners.length + 1,
      active: true,
    });
    setEditingBanner(null);
    setIsFormOpen(false);
  }

  function startEdit(banner: HeroBanner) {
    setEditingBanner(banner);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      image_url: banner.image_url,
      mobile_image_url: banner.mobile_image_url || '',
      badge_text: banner.badge_text || '',
      cta_text: banner.cta_text,
      cta_link: banner.cta_link,
      display_order: banner.display_order,
      active: banner.active,
    });
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingBanner) {
      await updateBanner(editingBanner.id, form);
    } else {
      await createBanner(form);
    }
    await loadBanners();
    resetForm();
  }

  async function handleConfirmDelete() {
    if (!deletingBanner) return;
    setIsDeleting(true);
    try {
      await deleteBanner(deletingBanner.id);
      await loadBanners();
    } catch (err) {
      console.error('Error deleting banner:', err);
    } finally {
      setIsDeleting(false);
      setDeletingBanner(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Hero Banners</h2>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
        >
          + Add Banner
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {editingBanner ? 'Edit Banner' : 'New Banner'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="A World Within Glass"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Badge Text</label>
              <input
                value={form.badge_text}
                onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="Handcrafted Terrariums"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subtitle *</label>
            <textarea
              required
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm resize-none"
              rows={2}
              placeholder="Each terrarium is a living piece of art..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              label="Desktop Banner Image *"
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
            />
            <ImageUpload
              label="Mobile Banner Image (Optional)"
              value={form.mobile_image_url}
              onChange={(url) => setForm({ ...form, mobile_image_url: url })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">CTA Text</label>
              <input
                value={form.cta_text}
                onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">CTA Link</label>
              <input
                value={form.cta_link}
                onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="banner-active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="banner-active" className="text-sm font-medium">Active</label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer">
              {editingBanner ? 'Update Banner' : 'Create Banner'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-text-main rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Banners Table */}
      {loading ? (
        <p className="text-text-muted">Loading banners...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse min-w-[650px]">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Order</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Title</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Status</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">CTA</th>
                  <th className="text-right px-6 py-3.5 whitespace-nowrap font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">#{banner.display_order}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{banner.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        banner.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{banner.cta_text}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap font-medium">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(banner)}
                          className="px-3 py-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingBanner(banner)}
                          className="px-3 py-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {banners.length === 0 && (
              <p className="text-center py-8 text-text-muted">No banners found. Add your first banner!</p>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingBanner}
        onClose={() => setDeletingBanner(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Banner"
        message={`Are you sure you want to delete banner "${deletingBanner?.title || ''}"? This action cannot be undone.`}
        confirmText="Delete Banner"
        isLoading={isDeleting}
      />
    </div>
  );
}

