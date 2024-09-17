'use client';

import React, { useEffect, useRef, useState } from 'react';
import Container from '@/components/container';
import UploadIcon from '@/static/icons/upload-icon';

const UploadPicture = ({
  imageUrl,
  handleImageChange,
  onSelectionComplete,
}: {
  imageUrl: string | null;
  handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
  onSelectionComplete: (selection: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isSelecting, setIsSelecting] = useState(false);

  const handleDisplayedButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    hiddenInputRef.current?.click();
  };

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleEnd = () => {
    setIsSelecting(false);
    onSelectionComplete(selection);
  };

  const handleStart = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    setSelection({ x, y, width: 0, height: 0 });
    setIsSelecting(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isSelecting || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    setSelection((prev) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y,
    }));
  };

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    handleEnd();
  };

  const handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = () => {
    handleEnd();
  };

  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.strokeRect(
          selection.x,
          selection.y,
          selection.width,
          selection.height,
        );
      };
      img.src = imageUrl;
    }
  }, [imageUrl, selection]);

  return (
    <Container className="flex flex-col items-center gap-4">
      <button onClick={handleDisplayedButtonClick} className="w-full">
        <div
          className={`relative flex aspect-square w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl ${imageUrl ? 'border-2' : 'border-2 border-dashed'} border-[#c2e7ec] bg-brand-gray-light text-text-003`}
        >
          {imageUrl ? (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="h-full w-full"
            />
          ) : (
            <>
              <UploadIcon className="h-8 w-8" />
              <p className="text-sm font-medium">사진 업로드</p>
            </>
          )}
        </div>
      </button>
      <input
        autoComplete="off"
        disabled={!!imageUrl}
        ref={hiddenInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageUrl && (
        <div className="text-sm font-semibold text-brand-blue-heavy">
          문제 내 그림이 포함된 경우 영역을 지정해주세요
        </div>
      )}
    </Container>
  );
};

export default UploadPicture;
