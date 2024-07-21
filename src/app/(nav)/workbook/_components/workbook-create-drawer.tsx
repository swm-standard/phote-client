'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';

import { Label } from '@/components/ui/label';
import UnctrlTextInput from '@/components/custom/unctrl-text-input';
import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL } from '@/app/_lib/constants';
import { useRouter } from 'next/navigation';

const WorkbookCreateDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [response, setResponse] = useState<string>('');
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/workbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleRef.current?.value,
          description: descriptionRef.current?.value,
        }),
      });

      await res.json();
      setResponse('성공');
      router.back();
    } catch (e) {
      setResponse('실패!');
      console.error('createWorkbook failed');
    }
  };

  const handleCloseClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) return;
    (async () =>
      await new Promise(() =>
        setTimeout(() => {
          router.back();
        }, 400),
      ))();
  }, [isOpen]);

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="bg-white">
        <DrawerTitle>문제집 생성</DrawerTitle>
        <DrawerDescription />
        <DrawerClose onClick={handleCloseClick}>취소</DrawerClose>
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
};

export default WorkbookCreateDrawer;
