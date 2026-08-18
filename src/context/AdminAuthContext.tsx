'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Simple admin credentials (in production, use Supabase Auth)
const ADMIN_EMAIL = 'admin@terrabloom.in';
const ADMIN_PASSWORD = 'terrabloom2024';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient()!;
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        }
        
        supabase.auth.onAuthStateChange((_event, session) => {
          setIsAuthenticated(!!session);
        });
      } else {
        const stored = sessionStorage.getItem('tb-admin-auth');
        if (stored === 'true') {
          setIsAuthenticated(true);
        }
      }
    }
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient()!;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Login error:', error.message);
        return false;
      }
      setIsAuthenticated(true);
      return true;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tb-admin-auth', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient()!;
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem('tb-admin-auth');
  }, []);

  return (
    <AdminAuthContext value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext>
  );
}

export function useAdminAuth(): AdminAuthContextType {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
