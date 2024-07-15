import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import React, { useState } from 'react';
import { deleteWorkbookByIdUrl } from '@/app/endpoint';
import { Status } from '@/app/types';
import { useParams } from 'next/navigation';

function DeleteAlertDialog({
  isOpen,
  toggleDeleteDialog,
}: {
  isOpen: boolean;
  toggleDeleteDialog: () => void;
}) {
  const params = useParams<{ workbookId: string }>();
  const [response, setResponse] = useState<Status>('loading');

  const handleConfirmClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const res = await fetch(deleteWorkbookByIdUrl(params.workbookId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setResponse('success');
      toggleDeleteDialog();
    } catch (e) {
      setResponse('error');
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white w-4/5 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>정말 문제집을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 문제집은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {response}
          <AlertDialogCancel onClick={toggleDeleteDialog}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertDialog;
