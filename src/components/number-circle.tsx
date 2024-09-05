import React from 'react';
import { cn } from '@/lib/utils';

const NumberCircle = ({
  number,
  className,
  isBlue = false,
}: {
  number: number;
  className?: string;
  isBlue?: boolean;
}) => {
  const colorButton: string = isBlue
    ? 'border-brand-blue-heavy bg-brand-blue-heavy'
    : 'border-text-004';

  const colorText: string = isBlue ? 'text-white' : 'text-text-002';

  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full border-[1px] pt-[1px]',
        colorButton,
        className,
      )}
    >
      <span className={cn('text-[10px] font-bold', colorText)}>{number}</span>
    </div>
  );
};

export default NumberCircle;
