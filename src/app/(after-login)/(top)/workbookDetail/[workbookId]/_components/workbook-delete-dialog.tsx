'use client';

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
import { Status } from '@/app/_lib/types';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL } from '@/app/_lib/constants';

function WorkbookDeleteDialog() {
  const params = useParams<{ workbookId: string }>();
  const router = useRouter();
  const [response, setResponse] = useState<Status>('loading');

  const handleConfirmClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/workbook/${params.workbookId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      await response.json();

      router.back();
      setResponse('success');
    } catch (e) {
      setResponse('error');
    }
  };

  const handleCancelClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
  };

  return (
    <AlertDialog open>
      <AlertDialogContent className="w-4/5 rounded-md bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>정말 문제집을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 문제집은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {response}
          <AlertDialogCancel onClick={handleCancelClick}>
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

export default WorkbookDeleteDialog;
