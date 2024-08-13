'use client';

import React, { useRef } from 'react';
import Container from '@/components/container';
import UploadIcon from '@/static/icons/upload-icon';
import Image from 'next/image';

export const UploadPicture = ({
  imageUrl,
  handleImageChange,
}: {
  imageUrl: string | null;
  handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const handleDisplayedButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    hiddenInputRef.current?.click();
  };

  return (
    <Container className="flex flex-col items-center">
      <button onClick={handleDisplayedButtonClick}>
        <div
          className={`relative flex h-96 w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl ${imageUrl ? 'border-2' : 'border-2 border-dashed'} border-[#c2e7ec] bg-brand-gray-light text-text-003`}
        >
          <UploadIcon className="h-8 w-8" />
          <p className="text-sm font-medium">사진 업로드</p>
          {imageUrl && <Image src={imageUrl} fill alt="사진 미리보기" />}
        </div>
      </button>
      <input
        ref={hiddenInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </Container>
  );
};
