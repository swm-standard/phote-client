'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  image: File | null;
  imageUrl: string | null;
  handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const UploadPicture = (props: Props) => {
  const { image, imageUrl, handleImageChange } = props;
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleDisplayedButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    hiddenInputRef.current?.click();
  };

  return (
    <div>
      <button
        className="w-32 h-32 bg-brand-blue-heavy"
        onClick={handleDisplayedButtonClick}
      >
        파일 업로드
      </button>
      <div className="bg-red-500 w-40 h-40">
        {imageUrl && <img src={imageUrl} />}
      </div>
      <form>
        <input
          ref={hiddenInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </form>
    </div>
  );
};
