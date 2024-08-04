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
import { createWorkbook } from '@/app/(after-login)/(nav)/workbook/workbook-api';

const WorkbookCreateDrawer = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  const { register, watch, getValues } = useForm<IWorkbookBase>({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const values = watch();

  const mutation = useMutation({
    mutationFn: createWorkbook,
  });

  const handleCloseClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    toggleOpen();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync(getValues());
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

export default WorkbookCreateDrawer;
