import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('rounded-lg py-1 font-medium', {
  variants: {
    theme: {
      light: 'bg-white text-text-001 border-[1px] border-text-001',
      dark: 'bg-text-001 text-white',
      disabled: 'bg-brand-gray-heavy text-text-003',
      lightgray: 'bg-brand-gray-light text-text-003',
      blue: 'bg-brand-blue-heavy text-white',
      lightblue: 'bg-brand-white text-brand-blue-heavy',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

type SquareButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

const SquareButton = ({
  className,
  children,
  theme,
  ...props
}: SquareButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants(props.disabled ? { theme: 'disabled' } : { theme }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SquareButton;
