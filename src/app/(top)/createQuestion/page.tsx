'use client';

import React, { useState } from 'react';
import Progress from '@/app/(top)/createQuestion/_components/progress/progress';
import ProgressChangeFooter from '@/app/(top)/createQuestion/_components/progress/progress-change-footer';
import { Step } from './_components/progress/types';
import CreateQuestionContent from '@/app/(top)/createQuestion/_components/content/create-question-content';
import Container from '@/components/container';

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
    <Container className="flex flex-col">
      <Progress currentStep={currentStep} />
      <section className="flex-grow flex flex-col">
        <CreateQuestionContent
          currentStep={currentStep}
          setToNextStep={setToNextStep}
          setToPrevStep={setToPrevStep}
        />
      </section>
    </Container>
  );
};

export default Page;
