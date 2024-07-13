'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Label } from '@/components/ui/label';
import { CustomTextInput } from '@/components/custom/custom-text-input';
import React, { useState, useEffect, useCallback } from 'react';
import {
  createWorkbookUrl,
  readWorkbooksUrl,
} from '@/app/main/workbook/endpoint';

export function DrawerDemo() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleToggleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(!open);
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setDescription(e.target.value);
  };

  const handleTitleXClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTitle('');
  };

  const handleDescriptionXClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setDescription('');
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(createWorkbookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      setResponse('성공');
      setOpen(false);
    } catch (e) {
      setResponse('실패!');
      console.error('createWorkbook failed');
    }
  };

  return (
    <Drawer open={open}>
      <DrawerTrigger asChild onClick={handleToggleClick}>
        <button>Open Drawer</button>
      </DrawerTrigger>

      <DrawerContent className="bg-white">
        <DrawerTitle>문제집 생성</DrawerTitle>
        <DrawerDescription />
        <DrawerClose onClick={handleToggleClick}>취소</DrawerClose>
        {response}
        <form onSubmit={handleFormSubmit}>
          <Label htmlFor="title">문제집 제목</Label>
          <CustomTextInput
            id="title"
            value={title}
            onChange={handleTitleChange}
            onClick={handleTitleXClick}
          />
          <Label htmlFor="description">문제집 설명</Label>
          <CustomTextInput
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            onClick={handleDescriptionXClick}
          />

          <button>확인</button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
