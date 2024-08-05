'use client';

import React, { useState } from 'react';
import { Step } from './_components/progress/types';
import Container from '@/components/container';
import Progress from '@/app/(after-login)/(top)/createQuestion/_components/progress/progress';
import CreateQuestionContent from '@/app/(after-login)/(top)/createQuestion/_components/content/create-question-content';

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
    <Container className="flex flex-col gap-6 bg-white px-6">
      <section>
        <Progress currentStep={currentStep} />
      </section>
      <section className="flex flex-grow flex-col">
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
