'use client';

import React from 'react';
import AlertDialog from '@/components/alert-dialog';
import { useRouter } from 'next/navigation';

const DialogTexts = {
  title: '문제 사진을 재촬영할까요?',
  description: '작업 상황은 저장되지 않습니다.',
};

const CancelAlertDialog = () => {
  const router = useRouter();

  const confirmAction = () => {
    router.back();
    setTimeout(() => {
      router.replace('/redirect/createQuestion');
    }, 100);
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
