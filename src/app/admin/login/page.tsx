'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
            🌿
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary">Terra Bloom</h1>
          <p className="text-text-secondary mt-2">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-5">
          <h2 className="text-xl font-semibold text-center mb-2">Sign In</h2>

          {error && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-main">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border border-border-custom rounded-lg outline-none focus:border-primary transition-colors"
              placeholder="username@domain.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text-main">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-3 border border-border-custom rounded-lg outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors cursor-pointer"
          >
            Sign In
          </button>


        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return <LoginForm />;
}
