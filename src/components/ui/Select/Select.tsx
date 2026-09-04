'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  image?: string;
  description?: string;
}

export interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string, option?: SelectOption) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function CustomSelect({
  label,
  placeholder = 'Select option...',
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(options.length - 1);
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          const opt = options[highlightedIndex];
          onChange(opt.value, opt);
          setIsOpen(false);
        }
      } else {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value, option);
    setIsOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-1.5 relative', className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-text-main flex items-center justify-between">
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      {/* Hidden input to support standard HTML form required validation if wrapped in a native form */}
      <input
        type="text"
        required={required}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        className="sr-only"
        aria-hidden="true"
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        className={cn(
          'w-full px-4 py-2.5 flex items-center justify-between border rounded-xl text-sm bg-white outline-none transition-all duration-150 cursor-pointer shadow-xs',
          isOpen
            ? 'border-primary ring-2 ring-primary/10 border-emerald-600'
            : 'border-gray-200 hover:border-gray-300',
          disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200',
          error && 'border-error focus:ring-error/10'
        )}
      >
        <span className="flex items-center gap-2.5 truncate">
          {selectedOption?.image && (
            <img
              src={selectedOption.image}
              alt=""
              className="w-5 h-5 rounded-md object-cover shrink-0"
            />
          )}
          {selectedOption ? (
            <span className="font-medium text-gray-900 truncate">{selectedOption.label}</span>
          ) : (
            <span className="text-gray-400 truncate">{placeholder}</span>
          )}
        </span>

        <svg
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2',
            isOpen && 'rotate-180 text-primary'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id={dropdownId}
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 max-h-60 overflow-y-auto animate-in fade-in duration-150"
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-xs text-gray-400 text-center">
              No categories available
            </div>
          ) : (
            options.map((option, idx) => {
              const isSelected = option.value === value;
              const isHighlighted = idx === highlightedIndex;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={cn(
                    'px-4 py-2.5 flex items-center justify-between text-sm cursor-pointer transition-colors duration-100',
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : isHighlighted
                      ? 'bg-gray-50 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {option.image && (
                      <img
                        src={option.image}
                        alt=""
                        className="w-5 h-5 rounded-md object-cover shrink-0"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="truncate">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-gray-400 truncate">{option.description}</span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-emerald-600 shrink-0 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
