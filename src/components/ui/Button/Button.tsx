'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-primary text-white border-primary hover:bg-primary-light hover:border-primary-light hover:-translate-y-0.5 hover:shadow-card',
  secondary: 'bg-secondary text-white border-secondary hover:bg-secondary-light hover:border-secondary-light hover:-translate-y-0.5',
  outline: 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5',
  ghost: 'bg-transparent text-text-main border-transparent hover:bg-bg-warm',
  danger: 'bg-error text-white border-error hover:opacity-90 hover:-translate-y-0.5',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  href,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-250 cursor-pointer border-2 whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-60 cursor-not-allowed',
    loading && 'relative !text-transparent',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {loading && (
          <span className="absolute w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="absolute w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
