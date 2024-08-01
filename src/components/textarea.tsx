import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const variants = cva(
  'resize-none rounded-lg border-[1px] p-2 text-sm font-normal text-text-001 placeholder-text-003 border-brand-gray-light',
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

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  className?: string;
  register: UseFormRegisterReturn;
  textLength: number;
} & VariantProps<typeof variants>;

const Textarea = ({
  className,
  register,
  state,
  textLength,
  ...props
}: TextAreaProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div className="relative">
      <textarea
        {...register}
        {...props}
        className={cn(
          variants({ state }),
          className,
          focused ? 'border-2 border-brand-blue-heavy bg-white p-[7px]' : '',
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <p className="absolute bottom-3 right-2 text-xs font-medium text-text-003">{`${textLength} / ${props.maxLength}`}</p>
    </div>
  );
};

export default Textarea;
