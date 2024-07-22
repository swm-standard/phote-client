'use client';

import React, { useState } from 'react';
import Progress from '@/app/(top)/createQuestion/_components/progress/progress';
import ProgressChangeFooter from '@/app/(top)/createQuestion/_components/progress/progress-change-footer';
import Step from './_components/progress/types';
import CreateQuestionContent from '@/app/(top)/createQuestion/_components/content/create-question-content';

const Page = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const setToNextStep = () => {
    setCurrentStep((prev) => {
      if (prev === 3) return prev;
      return (prev + 1) as Step;
    });
  };

  const setToPrevStep = () => {
    setCurrentStep((prev) => {
      if (prev === 1) return prev;
      return (prev - 1) as Step;
    });
  };

  return (
    <div className="relative w-full flex-grow">
      <Progress currentStep={currentStep} />
      <CreateQuestionContent currentStep={currentStep} />
      <ProgressChangeFooter
        currentStep={currentStep}
        setToNextStep={setToNextStep}
        setToPrevStep={setToPrevStep}
      />
    </div>
  );
};

export default Page;
