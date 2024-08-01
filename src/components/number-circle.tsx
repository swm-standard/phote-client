import React from 'react';
import { cn } from '@/lib/utils';

const NumberCircle = ({
  number,
  className,
}: {
  number: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-text-004 pt-[1px]',
        className,
      )}
    >
      <span className="text-[10px] font-bold text-text-002">{number}</span>
    </div>
  );
};

export default NumberCircle;
