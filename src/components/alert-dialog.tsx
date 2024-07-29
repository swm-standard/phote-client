'use client';

import {
  AlertDialog as AlertDialogContainer,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ClickStatus = 'NotYet' | 'Confirm' | 'Cancel';

const AlertDialog = ({
  title,
  description,
  confirmAction,
  cancelAction,
  preventDefault = false,
}: {
  title: string;
  description: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
  preventDefault?: boolean;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [clickStatus, setClickStatus] = useState<ClickStatus>('NotYet');

  const handleConfirmClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setClickStatus('Confirm');
    setIsOpen(false);
  };

  const handleCancelClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setClickStatus('Cancel');
    setIsOpen(false);
  };

  const action = async () => {
    await new Promise((res) => setTimeout(res, 400));
    if (clickStatus === 'Confirm') confirmAction && confirmAction();
    else if (clickStatus === 'Cancel') cancelAction && cancelAction();

    preventDefault || router.back();
  };

  useEffect(() => {
    if (isOpen) return;
    (async () => {
      await action();
    })();
  }, [isOpen]);

  return (
    <AlertDialogContainer open={isOpen}>
      <AlertDialogContent className="bg-white w-4/5 rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClick}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogContainer>
  );
};

export default AlertDialog;
