'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, getBanners } from '@/services';
import { Package, Image as ImageIcon, FolderTree, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    banners: 0,
    categories: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, categories, banners] = await Promise.all([
          getProducts(),
          getCategories(),
          getBanners(),
        ]);
        setStats({
          products: products.length,
          banners: banners.length,
          categories: categories.length,
        });
      } catch (err) {
        console.error('Error loading stats:', err);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { 
      label: 'Total Products', 
      value: stats.products, 
      icon: Package, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50', 
      border: 'border-indigo-100',
      ring: 'group-hover:ring-indigo-100'
    },
    { 
      label: 'Active Banners', 
      value: stats.banners, 
      icon: ImageIcon, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-100',
      ring: 'group-hover:ring-emerald-100'
    },
    { 
      label: 'Total Categories', 
      value: stats.categories, 
      icon: FolderTree, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50', 
      border: 'border-purple-100',
      ring: 'group-hover:ring-purple-100'
    },
  ];

  const quickActions = [
    { label: 'Manage Banners', href: '/admin/banners', icon: ImageIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Manage Products', href: '/admin/products', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Manage Categories', href: '/admin/categories', icon: FolderTree, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-white rounded-2xl p-6 border ${card.border} shadow-sm hover:shadow-md transition-all duration-300 group cursor-default hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color} ring-4 ring-transparent ${card.ring} transition-all duration-300`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-900 tracking-tight">{card.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-2">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex flex-col items-start p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.bg} ${action.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {action.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transform group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
