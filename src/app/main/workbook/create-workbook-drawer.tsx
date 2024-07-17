'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Label } from '@/components/ui/label';
import UnctrlTextInput from '@/components/custom/unctrl-text-input';
import React, { useRef, useState } from 'react';
import { createWorkbookUrl } from '@/app/endpoint';

function CreateWorkbookDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleToggleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(!open);
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
        body: JSON.stringify({
          title: titleRef.current?.value,
          description: descriptionRef.current?.value,
        }),
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
          <UnctrlTextInput id="title" allowClear ref={titleRef} />
          <Label htmlFor="description">문제집 설명</Label>
          <UnctrlTextInput id="description" allowClear ref={descriptionRef} />
          <button>확인</button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateWorkbookDrawer;
