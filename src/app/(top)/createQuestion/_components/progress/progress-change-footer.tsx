import React from 'react';
import Step from '@/app/(top)/createQuestion/_components/progress/types';

const ProgressChangeFooter = ({
  currentStep,
  setToNextStep,
  setToPrevStep,
}: {
  currentStep: Step;
  setToNextStep: () => void;
  setToPrevStep: () => void;
}) => {
  const handlePrevButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setToPrevStep();
  };

  const handleNextButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setToNextStep();
  };

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <button onClick={handlePrevButtonClick}>이전으로</button>
      <button onClick={handleNextButtonClick}>다음으로</button>
    </div>
  );
};

export default ProgressChangeFooter;
