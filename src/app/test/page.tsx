'use client';

import React, { useEffect, useState } from 'react';
import CtrlTextInput from '@/components/custom/ctrl-text-input';

const Page = () => {
  const [input, setInput] = useState<string>('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <p>{`Parent Component State : ${input}`}</p>
      <CtrlTextInput allowClear value={input} onChange={handleChange} />
    </div>
  );
};

export default Page;
