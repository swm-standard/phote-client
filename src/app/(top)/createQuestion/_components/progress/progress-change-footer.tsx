import React from 'react';
import { Step } from '@/app/(top)/createQuestion/_components/progress/types';
import SquareButton from '@/components/square-button';

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
  handleLeftButtonClick: () => void;
  handleRightButtonClick: () => void;
  currentStep: Step;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}) => {
  return (
    <div className="flex gap-4 py-4">
      <SquareButton
        buttonText={ButtonText[currentStep].left}
        variant="lightgray"
        disabled={leftDisabled}
        action={handleLeftButtonClick}
        className="flex-grow py-3"
      />
      <SquareButton
        buttonText={ButtonText[currentStep].right}
        variant="blue"
        disabled={rightDisabled}
        action={handleRightButtonClick}
        className="flex-grow py-3"
      />
    </div>
  );
};

export default ProgressChangeFooter;
