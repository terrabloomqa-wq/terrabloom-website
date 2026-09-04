'use client';

import React, { useEffect, useState } from 'react';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/services';
import type { Testimonial } from '@/types';
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);

  // Delete modal state
  const [deletingReview, setDeletingReview] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function handleConfirmDelete() {
    if (!deletingReview) return;
    setIsDeleting(true);
    try {
      await deleteTestimonial(deletingReview.id);
      await loadReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    } finally {
      setIsDeleting(false);
      setDeletingReview(null);
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse min-w-[650px]">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Name</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold">Rating</th>
                  <th className="px-6 py-3.5 whitespace-nowrap font-semibold w-1/2">Review</th>
                  <th className="text-right px-6 py-3.5 whitespace-nowrap font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{review.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-amber-500 font-bold tracking-widest text-sm">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-sm">{review.text}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap font-medium">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(review)}
                          className="px-3 py-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingReview(review)}
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
            {reviews.length === 0 && (
              <p className="text-center py-8 text-text-muted">No reviews found. Add your first review!</p>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        message={`Are you sure you want to delete review from "${deletingReview?.name || ''}"? This action cannot be undone.`}
        confirmText="Delete Review"
        isLoading={isDeleting}
      />
    </div>
  );
}

