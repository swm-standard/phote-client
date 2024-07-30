import React from 'react';

const NumberCircle = ({ number }: { number: number }) => {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-text-004 pt-[1px]">
      <span className="text-[10px] font-bold text-text-002">{number}</span>
    </div>
  );
};

export default NumberCircle;
