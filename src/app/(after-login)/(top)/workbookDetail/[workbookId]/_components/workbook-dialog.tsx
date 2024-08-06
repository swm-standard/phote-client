'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import React from 'react';
import SquareButton from '@/components/square-button';

function WorkbookDialog({
  isOpen,
  toggleOpen,
  dialogType = 'alert',
  confirmAction = async () => {},
  children,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  dialogType?: 'alert' | 'confirm';
  confirmAction?: () => Promise<void>;
  children?: React.ReactNode;
}) {
  const handleConfirmClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    await confirmAction();
    toggleOpen();
  };

  const handleCancelClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    toggleOpen();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-4/5 rounded-md bg-white p-5 pb-3">
        <AlertDialogTitle className="hidden" />
        <AlertDialogDescription className="hidden" />
        {children}
        <div className="flex gap-4">
          {dialogType === 'alert' ? (
            <SquareButton
              onClick={handleCancelClick}
              className="flex-grow"
              theme="lightgray"
            >
              취소
            </SquareButton>
          ) : null}
          <SquareButton
            onClick={handleConfirmClick}
            className="flex-grow"
            theme="blue"
          >
            확인
          </SquareButton>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WorkbookDialog;
