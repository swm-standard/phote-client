'use client';

import React from 'react';
import SquareButton from '@/components/square-button';
import { IWorkbookBase } from '@/model/i-workbook';
import useDialog from '@/hook/useDialog';
import WorkbookDetailDrawer from '@/components/workbook-detail-drawer';
import Dialog from '@/components/dialog';
import CopyIcon from '@/static/icons/copy-icon';
import StopwatchIcon from '@/static/icons/stopwatch-icon';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { createTest } from '@/api/exam-api';
import { useRouter } from 'next/navigation';

export type TestForm = {
  title: string;
  startTime: string;
  endTime: string;
  workbookId: string;
  capacity: number;
};

const WorkbookEditButtons = ({
  workbookId,
  workbookBase,
}: {
  workbookId: string;
  workbookBase: IWorkbookBase;
}) => {
  const { isOpen: isModifyOpen, toggleOpen: toggleModifyOpen } = useDialog();
  const { isOpen: isShareOpen, toggleOpen: toggleShareOpen } = useDialog();

  const { isOpen: isTestOpen, toggleOpen: toggleTestOpen } = useDialog();
  const { register, handleSubmit } = useForm<TestForm>({
    defaultValues: {
      title: workbookBase.title,
      startTime: dayjs().format('YYYY-MM-DDTHH:mm'),
      endTime: dayjs().format('YYYY-MM-DDTHH:mm'),
      workbookId,
      capacity: 10,
    },
  });

  const router = useRouter();
  const mutate = useMutation({ mutationFn: createTest });
  const onSubmit = async (data: TestForm) => {
    try {
      const response = await mutate.mutateAsync(data);
      router.push(`/test/${response.sharedExamId}`);
    } catch (e) {
      console.error(e);
    }
  };

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
          <button
            onClick={() => {
              toggleShareOpen();
              toggleTestOpen();
            }}
            className="mx-auto flex flex-col items-center justify-center gap-2"
          >
            <div className="h-fit w-fit rounded-full bg-brand-white p-2.5">
              <StopwatchIcon className="h-6 w-6 text-brand-blue-heavy" />
            </div>
            <p className="text-sm font-bold text-text-001">시험</p>
          </button>
        </div>
      </Dialog>
      <Dialog
        isOpen={isTestOpen}
        toggleOpen={toggleTestOpen}
        confirmAction={handleSubmit(onSubmit)}
      >
        <label className="font-bold text-brand-blue-heavy">시작일</label>
        <input {...register('startTime')} type="datetime-local" />
        <label className="font-bold text-brand-blue-heavy">마감일</label>
        <input {...register('endTime')} type="datetime-local" />
        <label className="font-bold text-brand-blue-heavy">인원수</label>
        <input {...register('capacity', { max: 20, min: 1 })} type="number" />
      </Dialog>
    </div>
  );
};

export default WorkbookEditButtons;
