'use client';

import React from 'react';
import SquareButton from '@/components/square-button';
import { IWorkbookBase } from '@/model/i-workbook';
import useDialog from '@/hook/useDialog';
import WorkbookDetailDrawer from '@/components/workbook-detail-drawer';
import WorkbookDialog from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-dialog';
import CopyIcon from '@/static/icons/copy-icon';

const WorkbookEditButtons = ({
  workbookBase,
}: {
  workbookBase: IWorkbookBase;
}) => {
  const { isOpen: isModifyOpen, toggleOpen: toggleModifyOpen } = useDialog();
  const { isOpen: isShareOpen, toggleOpen: toggleShareOpen } = useDialog();

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
      <WorkbookDialog
        dialogType="confirm"
        isOpen={isShareOpen}
        toggleOpen={toggleShareOpen}
      >
        <div className="mx-auto flex flex-col gap-2">
          <div className="h-fit w-fit rounded-full bg-brand-white p-2.5">
            <CopyIcon className="h-6 w-6 text-brand-blue-heavy" />
          </div>
          <p className="text-sm font-bold text-text-001">링크 복사</p>
        </div>
      </WorkbookDialog>
    </div>
  );
};

export default WorkbookEditButtons;
