'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = true,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-main">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'px-4 py-3 border-[1.5px] border-border-custom rounded-lg text-base text-text-main bg-white outline-none transition-all duration-150',
          'placeholder:text-text-muted',
          'focus:border-primary focus:ring-[3px] focus:ring-primary/10',
          error && 'border-error focus:ring-error/10'
        )}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
