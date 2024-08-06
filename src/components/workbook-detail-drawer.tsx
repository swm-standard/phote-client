'use client';

import { Drawer, DrawerContent } from '@/components/ui/drawer';

import React from 'react';
import Legend from '@/components/legend';
import Input from '@/components/input';
import SquareButton from '@/components/square-button';
import { useForm } from 'react-hook-form';
import { IWorkbookBase } from '@/model/i-workbook';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { updateWorkbookDetail } from '@/app/(after-login)/(top)/workbookDetail/workbook-detail-api';
import { useParams } from 'next/navigation';
import { createWorkbook } from '@/app/(after-login)/(nav)/workbook/workbook-api';

const WorkbookDetailDrawer = ({
  isOpen,
  toggleOpen,
  workbookBase = {
    title: '',
    description: '',
  },
  drawerType,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  workbookBase?: IWorkbookBase;
  drawerType: 'create' | 'modify';
}) => {
  const { workbookId } =
    drawerType === 'modify'
      ? useParams<{ workbookId: string }>()
      : { workbookId: '' };
  const { register, watch, getValues } = useForm<IWorkbookBase>({
    defaultValues: workbookBase,
  });
  const values = watch();

  const createMutation = useMutation({
    mutationFn: createWorkbook,
  });

  const modifyMutation = useMutation({
    mutationFn: updateWorkbookDetail,
  });

  const handleCloseClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    toggleOpen();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    {
      drawerType === 'create' &&
        (await createMutation.mutateAsync(getValues()));
    }
    {
      drawerType === 'modify' &&
        (await modifyMutation.mutateAsync({
          workbookBase: getValues(),
          workbookId,
        }));
    }
    toggleOpen();
  };

  return (
    <Drawer open={isOpen}>
      <DialogTitle className="hidden" />
      <DialogDescription className="hidden" />
      <DrawerContent className="bg-white p-4 pt-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <fieldset>
            <Legend className="mb-2" required>
              문제집 제목
            </Legend>
            <Input
              register={register('title')}
              maxLength={15}
              textLength={values.title.length}
            />
          </fieldset>
          <fieldset>
            <Legend required className="mb-2">
              문제집 설명
            </Legend>
            <Input
              register={register('description')}
              maxLength={30}
              textLength={values.description.length}
            />
          </fieldset>
          <div className="flex gap-4">
            <SquareButton
              type="button"
              className="flex-grow py-2"
              theme="lightgray"
              onClick={handleCloseClick}
            >
              취소
            </SquareButton>
            <SquareButton type="submit" className="flex-grow py-2" theme="blue">
              확인
            </SquareButton>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default WorkbookDetailDrawer;
