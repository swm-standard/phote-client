import React, { RefObject, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const variants = cva(
  'flex items-center rounded-lg border-[1px] p-2 text-sm font-normal text-text-001 placeholder-text-003 border-brand-gray-light',
  {
    variants: {
      state: {
        empty: 'border-brand-gray-heavy',
        focused: 'border-brand-blue-heavy',
        filled: 'bg-brand-gray-light',
      },
    },
    defaultVariants: {
      state: 'empty',
    },
  },
);

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  className?: string;
  register: UseFormRegisterReturn;
  textLength: number;
  ref?: RefObject<HTMLInputElement>;
} & VariantProps<typeof variants>;

const Input = ({
  className,
  register,
  state,
  textLength,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={cn(
        variants({ state }),
        className,
        focused ? 'border-2 border-brand-blue-heavy bg-white p-[7px]' : '',
      )}
    >
      <input
        {...register}
        {...props}
        className="flex-grow bg-inherit"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
      <p className="text-xs font-medium text-text-003">{`${textLength} / ${props.maxLength}`}</p>
    </div>
  );
};

export default Input;
