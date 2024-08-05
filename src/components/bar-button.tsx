import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type BarButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  icon: React.ComponentType<{ className: string }>;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  barButtonType?: 'button' | 'link';
};

const BarButton = ({
  icon: Icon,
  className,
  children,
  barButtonType = 'button',
  href,
  ...props
}: BarButtonProps) => {
  if (barButtonType === 'link')
    return (
      <Link
        href={href as string}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue-heavy py-3',
          className,
        )}
      >
        <Icon className="h-5 w-5 fill-white" />
        <p className="text-sm font-semibold text-white">{children}</p>
      </Link>
    );
  else if (barButtonType === 'button')
    return (
      <button
        {...props}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue-heavy py-3',
          className,
        )}
      >
        <Icon className="h-5 w-5 fill-white" />
        <p className="text-sm font-semibold text-white">{children}</p>
      </button>
    );
};

export default BarButton;
