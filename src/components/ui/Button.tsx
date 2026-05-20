import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: undefined;
  external?: undefined;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  href: string;
  external?: boolean;
  children: ReactNode;
}

type Props = ButtonProps | LinkProps;

const variantClasses: Record<NonNullable<Variant>, string> = {
  primary: 'bg-brand-purple text-white hover:bg-brand-violet border-transparent',
  secondary: 'bg-white text-brand-navy border border-neutral-200 hover:bg-neutral-50',
  ghost: 'bg-transparent text-white border border-white/20 hover:bg-white/10',
  outline: 'bg-transparent text-brand-purple border border-brand-purple hover:bg-brand-purple-light',
};

const sizeClasses: Record<NonNullable<Size>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const base = 'inline-flex items-center gap-2 font-body font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2';

export function Button({ variant = 'primary', size = 'md', children, className = '', ...rest }: Props) {
  const cls = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`;

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as LinkProps;
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
