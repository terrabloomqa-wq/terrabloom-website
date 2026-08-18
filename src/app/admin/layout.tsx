'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import { LayoutDashboard, Image as ImageIcon, Package, FolderTree, Settings, LogOut, Leaf, ExternalLink, Video } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Banners', href: '/admin/banners', icon: ImageIcon },
  { label: 'Promo Banner', href: '/admin/promo', icon: Video },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (isAuthenticated && pathname === '/admin/login') {
      router.push('/admin');
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    if (pathname === '/admin/login') {
      return <>{children}</>;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <p className="text-text-muted">Redirecting to login...</p>
      </div>
    );
  }

  if (isAuthenticated && pathname === '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-cream">
        <p className="text-text-muted">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col shrink-0 sticky top-0 h-screen border-r border-slate-800">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <Leaf className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-heading text-lg font-bold tracking-wide block leading-none text-slate-100 group-hover:text-white transition-colors">TERRA BLOOM</span>
              <span className="text-[10px] text-emerald-400/80 uppercase tracking-[0.2em] font-semibold mt-1 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-200 cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-rose-400 transition-colors" strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60 px-8 py-5 flex items-center justify-between">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
               {navItems.find((n) => n.href === pathname)?.label || 'Dashboard'}
             </h1>
             <p className="text-sm text-slate-500 mt-1">Manage your storefront and data</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 px-4 py-2 rounded-full transition-all duration-200 border border-transparent hover:border-emerald-200"
            target="_blank"
          >
            View Store
            <ExternalLink className="w-4 h-4" />
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
