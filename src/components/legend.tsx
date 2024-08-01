import React from 'react';

type LabelProps = {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

const Legend = ({ children, required = false, className = '' }: LabelProps) => {
  return (
    <legend
      className={'text-base font-bold text-text-001' + ` ${className}`}
    >{`${children}${required ? ' *' : ''}`}</legend>
  );
};

export default Legend;
