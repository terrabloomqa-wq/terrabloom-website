'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
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
    await loadProducts();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      await loadProducts();
    }
  }

  const categories = [
    { label: 'Closed Terrariums', slug: 'closed-terrariums' },
    { label: 'Open Terrariums', slug: 'open-terrariums' },
    { label: 'Customized Terrariums', slug: 'customized-terrariums' },
    { label: 'Paludariums', slug: 'paludariums' },
    { label: 'Terrarium Kits', slug: 'terrarium-kits' },
    { label: 'Accessories', slug: 'accessories' },
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category *</label>
              <select
                required
                value={form.category_slug}
                onChange={(e) => {
                  const cat = categories.find((c) => c.slug === e.target.value);
                  setForm({ ...form, category: cat?.label || '', category_slug: e.target.value });
                }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm bg-white cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                ))}
              </select>
            </div>
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
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Product</th>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Category</th>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Price</th>
                  <th className="text-left px-6 py-3 font-medium text-text-muted">Status</th>
                  <th className="text-right px-6 py-3 font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg bg-cover bg-center bg-bg-warm shrink-0"
                          style={{ backgroundImage: `url(${product.image_url})` }}
                        />
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{product.category}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {product.best_seller && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Best Seller</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => startEdit(product)} className="text-secondary hover:underline mr-4 cursor-pointer">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-error hover:underline cursor-pointer">
                        Delete
                      </button>
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
    </div>
  );
}
