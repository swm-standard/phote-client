import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

// const variants = cva();

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  className?: string;
  register: UseFormRegisterReturn;
  textLength: number;
};
// & VariantProps<typeof variants>;

const LinedInput = ({
  className,
  register,
  // state,
  textLength,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex items-center',
        focused ? 'border-b-[1px] border-brand-blue-heavy' : 'pb-[1px]',
      )}
    >
      <input
        autoComplete="off"
        {...register}
        {...props}
        className={cn(
          'flex-grow text-base font-medium text-text-001 placeholder-text-003 placeholder:font-extralight',
          className,
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {focused && (
        <p className="text-xs font-medium text-text-003">{`${textLength} / ${props.maxLength}`}</p>
      )}
    </div>
  );
};

export default LinedInput;
