import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('rounded-lg py-1 font-medium', {
  variants: {
    variant: {
      light: 'bg-white text-text-001 border-[1px] border-text-001',
      dark: 'bg-text-001 text-white',
      disabled: 'bg-brand-gray-heavy text-text-003',
      lightgray: 'bg-brand-gray-light text-text-003',
      blue: 'bg-brand-blue-heavy text-white',
      lightblue: 'bg-brand-white text-brand-blue-heavy',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

type SquareButtonProps = {
  className?: string;
  buttonText: string;
  action?: () => void;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants>;

const SquareButton = ({
  buttonText,
  className,
  action = () => {},
  variant,
  disabled = false,
}: SquareButtonProps) => {
  const handleClick = () => {
    disabled || action();
  };

  if (disabled) variant = 'disabled';

  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      type="button"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default SquareButton;
