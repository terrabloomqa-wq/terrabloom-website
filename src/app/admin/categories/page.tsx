'use client';

import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoriesService';
import type { Category } from '@/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [form, setForm] = useState({
    name: '',
    slug: '',
    image_url: '',
    active: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      name: '',
      slug: '',
      image_url: '',
      active: true,
    });
    setEditingCategory(null);
    setIsFormOpen(false);
  }

  function startEdit(category: Category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      slug: category.slug,
      image_url: category.image_url || '',
      active: category.active,
    });
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, form);
      } else {
        await createCategory(form);
      }
      await loadCategories();
      resetForm();
    } catch (err) {
      console.error('Failed to save category', err);
      alert('Error saving category');
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (err) {
        console.error('Failed to delete category', err);
        alert('Error deleting category');
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
        >
          + Add Category
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {editingCategory ? 'Edit Category' : 'New Category'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  // Auto-generate slug
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  setForm({ ...form, name, slug });
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="Open Terrariums"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Slug *</label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm bg-gray-50"
              />
            </div>
          </div>

          <ImageUpload
            label="Category Thumbnail"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="category-active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="category-active" className="text-sm font-medium cursor-pointer">Active</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-text-main rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories Table */}
      {loading ? (
        <p className="text-text-muted">Loading categories...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Category</th>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {category.image_url ? (
                          <div
                            className="w-10 h-10 rounded-lg bg-cover bg-center bg-bg-warm shrink-0"
                            style={{ backgroundImage: `url(${category.image_url})` }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                        <div>
                          <span className="font-medium block">{category.name}</span>
                          <span className="text-xs text-text-muted">/{category.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        category.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => startEdit(category)} className="text-secondary hover:underline mr-4 cursor-pointer">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="text-error hover:underline cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <p className="text-center py-8 text-text-muted">No categories found. Add your first category!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
