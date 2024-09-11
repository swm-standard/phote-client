'use client';

import React from 'react';
import SquareButton from '@/components/square-button';
import { IWorkbookBase } from '@/model/i-workbook';
import useDialog from '@/hook/useDialog';
import WorkbookDetailDrawer from '@/components/workbook-detail-drawer';
import Dialog from '@/components/dialog';
import CopyIcon from '@/static/icons/copy-icon';

const WorkbookEditButtons = ({
  workbookId,
  workbookBase,
}: {
  workbookId: string;
  workbookBase: IWorkbookBase;
}) => {
  const { isOpen: isModifyOpen, toggleOpen: toggleModifyOpen } = useDialog();
  const { isOpen: isShareOpen, toggleOpen: toggleShareOpen } = useDialog();

  const shareButtonClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Next.js Web Share API Demo',
          text: '이 페이지를 확인해보세요!',
          url: `/share-workbook/${workbookId}`,
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
        onClick={toggleModifyOpen}
        theme="light"
        className="flex-grow"
      >
        문제집 편집
      </SquareButton>
      <SquareButton
        theme="dark"
        className="flex-grow"
        onClick={toggleShareOpen}
      >
        문제집 공유
      </SquareButton>
      {isModifyOpen && (
        <WorkbookDetailDrawer
          drawerType="modify"
          workbookBase={workbookBase}
          isOpen={isModifyOpen}
          toggleOpen={toggleModifyOpen}
        />
      )}
      <Dialog
        dialogType="confirm"
        isOpen={isShareOpen}
        toggleOpen={toggleShareOpen}
      >
        <button
          onClick={shareButtonClick}
          className="mx-auto flex flex-col items-center justify-center gap-2"
        >
          <div className="h-fit w-fit rounded-full bg-brand-white p-2.5">
            <CopyIcon className="h-6 w-6 text-brand-blue-heavy" />
          </div>
          <p className="text-sm font-bold text-text-001">공유</p>
        </button>
      </Dialog>
    </div>
  );
};

export default WorkbookEditButtons;
