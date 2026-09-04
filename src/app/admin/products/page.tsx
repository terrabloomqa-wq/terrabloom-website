'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from '@/services';
import { formatPrice } from '@/lib/utils';
import type { Product, Category } from '@/types';
import ImageUpload from '@/components/ui/ImageUpload';
import Select, { SelectOption } from '@/components/ui/Select/Select';
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete modal state
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    category_slug: '',
    price: 0,
    original_price: 0,
    image_url: '',
    description: '',
    best_seller: false,
    featured: false,
    in_stock: true,
  });

  function generateUniqueSlug(base: string, excludeId?: string): string {
    const baseSlug = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = products
      .filter(p => !excludeId || p.id !== excludeId)
      .map(p => p.slug);
    if (!existing.includes(baseSlug)) return baseSlug;
    let counter = 2;
    while (existing.includes(`${baseSlug}-${counter}`)) counter++;
    return `${baseSlug}-${counter}`;
  }

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategoriesList(categoriesData);
    } catch (err) {
      console.error('Error loading products/categories:', err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      title: '', slug: '', category: '', category_slug: '',
      price: 0, original_price: 0, image_url: '', description: '',
      best_seller: false, featured: false, in_stock: true,
    });
    setEditingProduct(null);
    setIsFormOpen(false);
  }

  function startEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      title: product.title,
      slug: product.slug,
      category: product.category,
      category_slug: product.category_slug,
      price: product.price,
      original_price: product.original_price || 0,
      image_url: product.image_url,
      description: product.description,
      best_seller: product.best_seller,
      featured: product.featured,
      in_stock: product.in_stock,
    });
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const productData = {
      ...form,
      original_price: form.original_price || undefined,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await createProduct(productData as Omit<Product, 'id' | 'created_at'>);
    }
    await loadData();
    resetForm();
  }

  async function handleConfirmDelete() {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deletingProduct.id);
      await loadData();
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setIsDeleting(false);
      setDeletingProduct(null);
    }
  }

  const categoryOptions: SelectOption[] = categoriesList.map((cat) => ({
    value: cat.slug,
    label: cat.name,
    image: cat.image_url,
  }));

  if (form.category_slug && !categoryOptions.some((c) => c.value === form.category_slug)) {
    categoryOptions.unshift({
      value: form.category_slug,
      label: form.category || form.category_slug,
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = generateUniqueSlug(title, editingProduct?.id);
                  setForm({ ...form, title, slug });
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="Forest Globe"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <Select
              label="Category"
              required
              placeholder="Select Category"
              options={categoryOptions}
              value={form.category_slug}
              onChange={(value, option) => {
                setForm({
                  ...form,
                  category_slug: value,
                  category: option ? option.label : '',
                });
              }}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Price (₹) *</label>
              <input
                required
                type="number"
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="1299"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Original Price (₹)</label>
              <input
                type="number"
                value={form.original_price || ''}
                onChange={(e) => setForm({ ...form, original_price: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="1599"
              />
            </div>
          </div>

          <ImageUpload
            label="Product Image"
            value={form.image_url}
            onChange={(url) => setForm({ ...form, image_url: url })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.best_seller} onChange={(e) => setForm({ ...form, best_seller: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm font-medium">Best Seller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm font-medium">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="w-4 h-4" />
              <span className="text-sm font-medium">In Stock</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-text-main rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      {loading ? (
        <p className="text-text-muted">Loading products...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse min-w-[750px]">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Product</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Category</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Price</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Status</th>
                  <th className="text-right px-6 py-3.5 whitespace-nowrap font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg bg-cover bg-center bg-bg-warm shrink-0 border border-gray-100"
                          style={{ backgroundImage: `url(${product.image_url})` }}
                        />
                        <span className="font-semibold text-gray-900 max-w-xs truncate">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {product.best_seller && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                            Best Seller
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.in_stock ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        }`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap font-medium">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="px-3 py-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
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
            {products.length === 0 && (
              <p className="text-center py-8 text-text-muted">No products found. Add your first product!</p>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingProduct?.title || 'this product'}"? This action cannot be undone.`}
        confirmText="Delete Product"
        isLoading={isDeleting}
      />
    </div>
  );
}

