'use client';

import React, { useEffect, useState } from 'react';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services';
import type { Testimonial } from '@/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({
    name: '',
    rating: 5,
    text: '',
  });

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const data = await getAllTestimonials();
      setReviews(data);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      name: '',
      rating: 5,
      text: '',
    });
    setEditingReview(null);
    setIsFormOpen(false);
  }

  function startEdit(review: Testimonial) {
    setEditingReview(review);
    setForm({
      name: review.name,
      rating: review.rating,
      text: review.text,
    });
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingReview) {
      await updateTestimonial(editingReview.id, form);
    } else {
      await createTestimonial(form);
    }
    await loadReviews();
    resetForm();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteTestimonial(id);
      await loadReviews();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer"
        >
          + Add Review
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 mb-6 space-y-4">
          <h3 className="text-lg font-semibold">
            {editingReview ? 'Edit Review' : 'New Review'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Customer Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Rating (1-5) *</label>
              <input
                type="number"
                min="1"
                max="5"
                required
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Review Content *</label>
            <textarea
              required
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-primary text-sm resize-none"
              rows={4}
              placeholder="Write the review here..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors cursor-pointer">
              {editingReview ? 'Update Review' : 'Add Review'}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-text-main rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews Table */}
      {loading ? (
        <p className="text-text-muted">Loading reviews...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-text-muted">Name</th>
                <th className="text-left px-6 py-3 font-medium text-text-muted">Rating</th>
                <th className="text-left px-6 py-3 font-medium text-text-muted w-1/2">Review</th>
                <th className="text-right px-6 py-3 font-medium text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{review.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-accent-light font-bold">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-muted truncate max-w-xs">{review.text}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => startEdit(review)}
                      className="text-secondary hover:underline mr-4 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-error hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reviews.length === 0 && (
            <p className="text-center py-8 text-text-muted">No reviews found. Add your first review!</p>
          )}
        </div>
      )}
    </div>
  );
}
