'use client';

import React, { useRef } from 'react';

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
        className="h-32 w-32 bg-brand-blue-heavy"
        onClick={handleDisplayedButtonClick}
      >
        파일 업로드
      </button>
      <div className="h-40 w-40 bg-red-500">
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
