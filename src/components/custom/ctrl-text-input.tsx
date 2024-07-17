import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'value'
> & {
  allowClear?: boolean;
  className?: string;
  value: string;
};

const CtrlTextInput = ({
  allowClear,
  className,
  value,
  ...props
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setInputValue('');
  };

  return (
    <div className="flex p-4">
      <input
        type="text"
        value={inputValue}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {allowClear && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
};

export default CtrlTextInput;
