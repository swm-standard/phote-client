import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  allowClear?: boolean;
};

const UnctrlTextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, allowClear = false, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>();

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      e,
    ) => {
      setInputValue(e.target.value);
    };

    const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      setInputValue('');
    };

    return (
      <div className="flex p-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {allowClear && (
          <button type="button" onClick={handleClearClick}>
            X
          </button>
        )}
      </div>
    );
  },
);
UnctrlTextInput.displayName = 'TextInput';

export default UnctrlTextInput;
