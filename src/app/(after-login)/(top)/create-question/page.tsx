'use client';

import React, { useState } from 'react';
import Container from '@/components/container';
import Progress from '@/app/(after-login)/(top)/create-question/_components/progress/progress';
import CreateQuestionContent from '@/app/(after-login)/(top)/create-question/_components/content/create-question-content';
import { IStep } from '@/model/i-step';

const Page = () => {
  const [step, setStep] = useState<IStep>(1);

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as IStep);
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3) as IStep);
  };

  return (
    <Container className="flex flex-col gap-6 bg-white px-6">
      <section>
        <Progress step={step} />
      </section>
      <section className="flex flex-grow flex-col">
        <CreateQuestionContent
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      </section>
    </Container>
  );
};

export default Page;
