'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const getHeaderText = (pathname: string): string => {
  if (pathname.includes('workbookDetail')) return '문제집 상세';
  if (pathname.includes('questionCreation')) return '문제 생성';
  return 'not found';
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  return (
    <div className="flex flex-row">
      <button onClick={handleBackClick}>go back</button>
      <h1>{getHeaderText(pathname)}</h1>
    </div>
  );
};

export default Header;
