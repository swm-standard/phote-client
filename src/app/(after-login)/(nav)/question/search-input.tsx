import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import SearchGlassIcon from '@/static/icons/search-glass-icon';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  className?: string;
  register: UseFormRegisterReturn;
};

const SearchInput = ({ className, register, ...props }: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex items-center rounded-lg border-[1px] border-brand-gray-light bg-white p-3 text-sm font-normal text-text-001 placeholder-text-003',
        className,
        focused ? 'border-2 border-brand-blue-heavy bg-white p-[11px]' : '',
      )}
    >
      <input
        {...register}
        {...props}
        autoComplete="off"
        className="flex-grow bg-inherit"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SearchGlassIcon className="h-5 w-5 text-brand-blue-light" />
    </div>
  );
};

export default SearchInput;
