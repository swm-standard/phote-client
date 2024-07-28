'use client';
import React from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

const HeaderItems: Record<string, { text: string }> = {
  createQuestion: {
    text: '문제 생성',
  },
  workbookDetail: {
    text: '문제집 상세',
  },
  none: {
    text: '잘못된 주소',
  },
};

const Header = () => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const headerItem = HeaderItems[segment || 'none'];

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  return (
    <div className="flex flex-row">
      <button onClick={handleBackClick}>go back</button>
      <h1>{headerItem.text}</h1>
    </div>
  );
};

export default Header;
