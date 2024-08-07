import React from 'react';
import SquareButton from '@/components/square-button';
import { Step } from '@/app/(after-login)/(top)/createQuestion/_components/progress/types';

const ButtonText = {
  1: {
    left: '직접 입력하기',
    right: '사진 변환하기',
  },
  2: {
    left: '사진 다시찍기',
    right: '다음으로',
  },
  3: {
    left: '이전으로',
    right: '문제 생성',
  },
};

const ProgressChangeFooter = ({
  handleLeftButtonClick,
  handleRightButtonClick,
  currentStep,
  leftDisabled = false,
  rightDisabled = false,
}: {
  handleLeftButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleRightButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  currentStep: Step;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}) => {
  return (
    <div className="flex gap-4 py-4">
      <SquareButton
        theme="lightgray"
        disabled={leftDisabled}
        onClick={handleLeftButtonClick}
        className="flex-grow py-3"
      >
        {ButtonText[currentStep].left}
      </SquareButton>
      <SquareButton
        theme="blue"
        disabled={rightDisabled}
        onClick={handleRightButtonClick}
        className="flex-grow py-3"
      >
        {ButtonText[currentStep].right}
      </SquareButton>
    </div>
  );
};

export default ProgressChangeFooter;
