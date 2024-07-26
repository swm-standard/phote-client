'use client';

import React from 'react';
import AlertDialog from '@/components/alert-dialog';
import { useRouter } from 'next/navigation';

const DialogTexts = {
  title: '문제 생성을 취소할까요?',
  description: '작업 상황은 저장되지 않습니다.',
};

const CancelAlertDialog = () => {
  const router = useRouter();

  const confirmAction = () => {
    router.replace('/redirect/createQuestion');
  };

  const cancelAction = () => {
    router.back();
  };

  return (
    <AlertDialog
      title={DialogTexts.title}
      description={DialogTexts.description}
      confirmAction={confirmAction}
      cancelAction={cancelAction}
      preventDefault
    />
  );
};

export default CancelAlertDialog;
