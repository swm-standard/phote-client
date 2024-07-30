'use client';
import React from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import AngleLeftIcon from '@/static/icons/angle-left-icon';

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
    <div className="flex gap-2.5 bg-white px-5 py-4">
      <button onClick={handleBackClick}>
        <AngleLeftIcon className="h-6 w-6" />
      </button>
      <p className="text-lg font-bold text-text-001">{headerItem.text}</p>
    </div>
  );
};

export default Header;
