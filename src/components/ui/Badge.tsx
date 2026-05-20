import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'purple' | 'navy' | 'neutral';
  className?: string;
}

const variants = {
  purple: 'bg-brand-purple-light text-brand-purple',
  navy: 'bg-brand-navy text-white',
  neutral: 'bg-neutral-100 text-neutral-600',
};

export function Badge({ children, variant = 'purple', className = '' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
