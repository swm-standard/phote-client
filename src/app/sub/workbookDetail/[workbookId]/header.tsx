'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  return (
    <div className="flex flex-row">
      <button onClick={handleBackClick}>go back</button>
      <h1>문제집 상세</h1>
    </div>
  );
};

export default Header;
