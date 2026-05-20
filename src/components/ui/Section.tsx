import type { ReactNode } from 'react';

type Background = 'white' | 'light' | 'purple-tint' | 'dark';

interface Props {
  id?: string;
  background?: Background;
  children: ReactNode;
  className?: string;
}

const bgClasses: Record<Background, string> = {
  white: 'bg-white',
  light: 'bg-neutral-50',
  'purple-tint': 'bg-brand-purple-light/40',
  dark: 'bg-brand-navy',
};

export function Section({ id, background = 'white', children, className = '' }: Props) {
  return (
    <section id={id} className={`${bgClasses[background]} ${className}`}>
      {children}
    </section>
  );
}
