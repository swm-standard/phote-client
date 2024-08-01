import React from 'react';
import { Step } from '@/app/(top)/createQuestion/_components/progress/types';
import Container from '@/components/container';
import ProgressBar from '@/app/(top)/createQuestion/_components/progress/progress-bar';

type StepText = {
  main: string;
  sub: string;
};

const StepTexts: StepText[] = [
  {
    main: '생성할 문제의 사진을 찍어주세요',
    sub: '이미 사진첩에 존재하는 사진도 추가할 수 있어요',
  },
  {
    main: '올바르게 변환되었는지 확인해주세요',
    sub: '문제가 있는 경우 직접 수정할 수 있어요',
  },
  {
    main: '추가 정보를 입력하고 생성을 완료하세요',
    sub: '태그와 메모는 반드시 기입할 필요 없어요',
  },
];

const Progress = ({ currentStep }: { currentStep: Step }) => {
  const { main, sub } = StepTexts[currentStep - 1];
  return (
    <Container className="mt-6 flex flex-col items-center gap-8">
      <ProgressBar currentStep={currentStep} />
      <section className="flex flex-col items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-white pt-[1px]">
          <span className="text-base font-bold text-brand-blue-heavy text-text-002">
            {currentStep}
          </span>
        </div>
        <p className="text-lg font-medium text-text-001">{main}</p>
        <p className="text-sm font-normal text-text-003">{sub}</p>
      </section>
    </Container>
  );
};

export default Progress;
