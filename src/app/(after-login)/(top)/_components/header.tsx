'use client';
import React from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import AngleLeftIcon from '@/static/icons/angle-left-icon';
import Dialog from '@/components/dialog';
import useDialog from '@/hook/useDialog';

const HeaderItems: Record<string, { text: string }> = {
  createQuestion: {
    text: '문제 생성',
  },
  workbookDetail: {
    text: '문제집 상세',
  },
  'register-question': {
    text: '문제 등록',
  },
  none: {
    text: '잘못된 주소',
  },
};

const Header = () => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment() ?? 'none';

  const { isOpen, toggleOpen } = useDialog();

  const confirmAction = async () => {
    router.back();
  };

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    segment === 'createQuestion' ? toggleOpen() : router.back();
  };

  return (
    <>
      <div className="flex gap-2.5 bg-white px-5 py-4">
        <button onClick={handleBackClick}>
          <AngleLeftIcon className="h-6 w-6" />
        </button>
        <p className="text-lg font-bold text-text-001">
          {(HeaderItems[segment] || HeaderItems['none']).text}
        </p>
      </div>
      {segment === 'createQuestion' && (
        <Dialog
          isOpen={isOpen}
          confirmAction={confirmAction}
          toggleOpen={toggleOpen}
        >
          <p className="text-001 text-center text-lg font-bold">
            문제 생성 그만두기
          </p>
          <p className="text-001 text-sm font-medium">
            문제 생성을 취소하시겠습니까? 변경 사항은 저장되지 않습니다.
          </p>
        </Dialog>
      )}
    </>
  );
};

export default Header;
