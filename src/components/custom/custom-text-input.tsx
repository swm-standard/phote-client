import { cn } from '@/lib/utils';
import { InputHTMLAttributes, MouseEventHandler } from 'react';

type CustomTextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onClick'
> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const CustomTextInput = ({ onClick, ...props }: CustomTextInputProps) => {
  return (
    <div className="flex p-4">
      <input
        type="text"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      />
      <button onClick={onClick}>X</button>
    </div>
  );
};

export { CustomTextInput };
