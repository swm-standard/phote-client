import React from 'react';
import SquareButton from '@/components/square-button';
import { StepProps } from '@/app/(after-login)/(top)/createQuestion/_components/content/create-question-content';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { transformToQuestion } from '@/app/(after-login)/(top)/createQuestion/create-question-api';
import { useFormContext } from 'react-hook-form';
import { ICreateQuestion } from '@/model/i-question';

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
  rawImage,
  step,
  prevStep,
  nextStep,
}: StepProps & { rawImage: File | null }) => {
  const router = useRouter();
  const { reset } = useFormContext<ICreateQuestion>();

  const isPrevDisabled = () => {
    if (step === 1) return false;
    if (step === 2) return false; // 경고 모달
    if (step === 3) return false;
  };

  const isNextDisabled = () => {
    if (step === 1) return !rawImage;
    if (step === 2) return false;
    if (step === 3) return true; // 필수인애들 다넣기
  };

  const handlePrevButtonClick = () => {
    if (step === 1) nextStep();
    if (step === 2) prevStep();
    if (step === 3) prevStep();
  };

  const transformMutation = useMutation({
    mutationFn: transformToQuestion,
  });

  const handleNextButtonClick = async () => {
    if (step === 1 && rawImage) {
      nextStep();
    }
    if (step === 2) nextStep();
    if (step === 3) router.push('/question');
  };

  return (
    <div className="sticky bottom-0 flex gap-4 bg-white py-4">
      <SquareButton
        theme="lightgray"
        disabled={isPrevDisabled()}
        onClick={handlePrevButtonClick}
        className="flex-grow py-3"
      >
        {ButtonText[step].left}
      </SquareButton>
      <SquareButton
        theme="blue"
        disabled={isNextDisabled()}
        onClick={handleNextButtonClick}
        className="flex-grow py-3"
      >
        {ButtonText[step].right}
      </SquareButton>
    </div>
  );
};

export default ProgressChangeFooter;
