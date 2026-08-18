import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<string, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-9 h-9 border-[3px]',
  lg: 'w-13 h-13 border-4',
};

export default function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-border-custom border-t-primary animate-spin',
        sizeClasses[size]
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
