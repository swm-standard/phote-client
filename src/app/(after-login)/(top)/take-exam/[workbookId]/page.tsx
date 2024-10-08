'use client';

import React, { useEffect } from 'react';
import Container from '@/components/container';
import dayjs from 'dayjs';
import StopwatchIcon from '@/static/icons/stopwatch-icon';
import { useMutation, useQuery } from '@tanstack/react-query';
import ExamFooter from '@/app/(after-login)/(top)/take-exam/[workbookId]/exam-footer';
import ExamCard from '@/app/(after-login)/(top)/take-exam/[workbookId]/exam-card';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { IQuestion } from '@/model/i-question';
import { useRouter } from 'next/navigation';

import { readRegisteredQuestion } from '@/api/registered-question-api';
import { submitExam } from '@/api/exam-api';
import Dialog from '@/components/dialog';
import useDialog from '@/hook/useDialog';

export type Answers = {
  answers: Answer[];
};

export type Answer = {
  answer: string;
};

const Page = ({ params }: { params: { workbookId: string } }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1);
  const [elapsedMinute, setElapsedMinute] = React.useState<string>('0');
  const { isOpen, toggleOpen } = useDialog(true);

  const methods = useForm<Answers>({
    defaultValues: {
      answers: [],
    },
  });

  const { append } = useFieldArray({
    control: methods.control,
    name: 'answers',
  });

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['questionInWorkbook'],
    queryFn: () => readRegisteredQuestion(params.workbookId),
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (!isSuccess) return;
    data.forEach(() => append({ answer: '' }));
  }, [isSuccess]);

  const prevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 1));
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, data.length));
  };

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const currentTime = Date.now();
      setElapsedMinute(dayjs(currentTime - startTime).format('m'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mutate = useMutation({
    mutationFn: submitExam,
  });

  const router = useRouter();
  const handleSubmitClick = async () => {
    const answers = methods.getValues();
    const submitAnswers = data.map((question: IQuestion, idx: number) => {
      return {
        questionId: question.questionId,
        submittedAnswer: answers.answers[idx].answer,
      };
    });

    const responseData = await mutate.mutateAsync({
      workbookId: params.workbookId,
      time: Number(elapsedMinute),
      answers: submitAnswers,
    });

    if (mutate.isSuccess) router.replace(`/exam-detail/${responseData.examId}`);
  };

  if (isPending) return <div>loading...</div>;
  else if (isError) return <div>Error</div>;

  if (data.length === 0)
    return (
      <>
        <Dialog
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          dialogType="confirm"
          confirmAction={() => router.back()}
        >
          <div>문제집 내에 한문제 이상이 포함되어 있어야 합니다.</div>
        </Dialog>
      </>
    );
  return (
    <Container className="flex flex-col bg-white px-4">
      <FormProvider {...methods}>
        <section className="flex flex-grow flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gray-heavy">
              <p className="text-base font-semibold text-text-002">
                {currentQuestion}
              </p>
            </div>
            <div className="flex w-fit items-center justify-center gap-1 rounded-full bg-[#f9eeee] px-2 py-1 text-[#da3939]">
              <StopwatchIcon className="h-5 w-5" />
              <p>{`${elapsedMinute}분`}</p>
            </div>
          </div>
          <ExamCard
            question={data[currentQuestion - 1]}
            idx={currentQuestion - 1}
          />
        </section>
        <ExamFooter
          currentQuestion={currentQuestion}
          maxQuestion={data.length}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          handleSubmitClick={handleSubmitClick}
        />
      </FormProvider>
    </Container>
  );
};

export default Page;
