'use client';

import React from 'react';
import SquareButton from '@/components/square-button';
import useDialog from '@/hook/useDialog';
import Dialog from '@/components/dialog';
import CopyIcon from '@/static/icons/copy-icon';

const TestEditButtons = ({
  workbookId,
  examId,
}: {
  workbookId: string;
  examId: string;
}) => {
  const { isOpen: isShareOpen, toggleOpen: toggleShareOpen } = useDialog();

  const shareButtonClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '포테',
          text: '시험 공유',
          url: `/take-test/${workbookId}/${examId}`,
        });
        console.log('공유 성공');
      } catch (error) {
        console.error('공유 실패', error);
      }
    }
  };

  return (
    <div className="flex flex-row gap-3">
      <SquareButton
        theme="dark"
        className="flex-grow"
        onClick={toggleShareOpen}
      >
        시험 공유
      </SquareButton>
      <Dialog
        dialogType="confirm"
        isOpen={isShareOpen}
        toggleOpen={toggleShareOpen}
      >
        <div className="flex justify-between">
          <button
            onClick={shareButtonClick}
            className="mx-auto flex flex-col items-center justify-center gap-2"
          >
            <div className="h-fit w-fit rounded-full bg-brand-white p-2.5">
              <CopyIcon className="h-6 w-6 text-brand-blue-heavy" />
            </div>
            <p className="text-sm font-bold text-text-001">공유</p>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default TestEditButtons;
