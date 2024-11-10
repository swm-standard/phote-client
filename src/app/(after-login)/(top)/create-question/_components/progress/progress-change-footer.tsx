import React, { useState } from 'react';
import SquareButton from '@/components/square-button';
import { StepProps } from '@/app/(after-login)/(top)/create-question/_components/content/create-question-content';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { EmptyCreateQuestion, ICreateQuestion } from '@/model/i-question';
import useDialog from '@/hook/useDialog';
import Dialog from '@/components/dialog';
import Loading from '@/components/ui/loading';
import { createQuestion, transformImageToQuestion } from '@/api/question-api';

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
  readOptions,
  crop,
}: StepProps & {
  rawImage: File | null;
  readOptions: (options: string[]) => void;
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}) => {
  const router = useRouter();
  const { reset, getValues } = useFormContext<ICreateQuestion>();

  const alertDialog = useDialog();

  const isPrevDisabled = () => {
    if (step === 1) return false;
    if (step === 2) return false; // 경고 모달
    if (step === 3) return false;
  };

  const isNextDisabled = () => {
    if (step === 1) return !rawImage;
    if (step === 2) return false;
    if (step === 3)
      return !(
        getValues('statement') &&
        getValues('category') &&
        getValues('answer')
      ); // 필수인애들 다넣기
  };

  const handlePrevButtonClick = () => {
    if (step === 1) nextStep();
    if (step === 2) alertDialog.toggleOpen();
    if (step === 3) prevStep();
  };

  const confirmAction = async () => {
    prevStep();
    reset(EmptyCreateQuestion);
  };

  const transformMutation = useMutation({
    mutationFn: transformImageToQuestion,
  });

  const createMutation = useMutation({
    mutationFn: createQuestion,
  });

  const [error, setError] = useState<string>('');
  const handleNextButtonClick = async () => {
    if (step === 1 && rawImage) {
      try {
        const question = await transformMutation.mutateAsync({
          image: rawImage,
          crop,
        });

        reset({ ...question, options: [] });
        readOptions(question ? question.options : []);
        nextStep();
      } catch (e) {
        // @ts-expect-error debuging
        setError(e.message);
      }
    }
    if (step === 2) nextStep();
    if (step === 3) {
      const result = await createMutation.mutateAsync(getValues());
      if (result) router.replace('/question');
    }
  };

  return (
    <>
      {transformMutation.isPending || createMutation.isPending ? (
        <Loading />
      ) : null}
      <p className="text-center">{error}</p>
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
      <Dialog {...alertDialog} confirmAction={confirmAction}>
        <p className="text-001 text-center text-lg font-bold">사진 다시 찍기</p>
        <p className="text-001 text-sm font-medium">
          사진을 다시 등록하시겠습니까? 변경 사항은 저장되지 않습니다.
        </p>
      </Dialog>
    </>
  );
};

export default ProgressChangeFooter;
