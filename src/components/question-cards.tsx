import { Question, QuestionCardType, Status } from '@/app/_lib/types';
import { Reorder, useDragControls } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { BASE_URL } from '@/app/_lib/constants';
import Container from '@/components/container';
import QuestionCard from '@/components/question-card';

const QuestionCards = ({
  questions,
  questionCardType = 'default',
  checkedQuestions,
  checkQuestion,
  uncheckQuestion,
}: {
  questions: Question[];
  questionCardType?: QuestionCardType;
  checkedQuestions?: string[];
  checkQuestion?: (id: string) => void;
  uncheckQuestion?: (id: string) => void;
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [countApiCalls, setCountApiCalls] = useState<number>(0);
  const params = useParams<{ workbookId: string }>();
  const [debouncedQuestions] = useDebounce(questions, 2000);

  const updateQuestionSequence = async () => {
    if (countApiCalls === 0) {
      setCountApiCalls((prev) => prev + 1);
      return;
    }

    const requestData = questions.map((ques, idx) => {
      return { id: ques.id, sequence: idx + 1 };
    });

    try {
      const response = await fetch(
        `${BASE_URL}/workbook/question-sequence/${params.workbookId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        },
      );

      const data = await response.json();
      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setCountApiCalls((prev) => prev + 1);
    }
  };

  useEffect(() => {
    (async () => {
      await updateQuestionSequence();
    })();
  }, [debouncedQuestions]);

  return (
    <Container className="flex flex-col">
      {questions.map((ques, idx) => {
        switch (questionCardType) {
          case 'default':
            return (
              <QuestionCard
                key={ques.id}
                question={ques}
                questionNumber={idx + 1}
              />
            );
          case 'check':
            return (
              <QuestionCard
                key={ques.id}
                question={ques}
                questionNumber={idx + 1}
                questionCardType="check"
                isChecked={checkedQuestions?.includes(ques.id)}
                checkQuestion={checkQuestion}
                uncheckQuestion={uncheckQuestion}
              />
            );
          case 'swap':
            return (
              <ReorderWrapper
                key={ques.id}
                question={ques}
                questionNumber={idx + 1}
              />
            );
        }
      })}
    </Container>
  );
};

const ReorderWrapper = ({
  question,
  questionNumber,
}: {
  question: Question;
  questionNumber: number;
}) => {
  const controls = useDragControls();

  return (
    <Reorder.Item value={question} dragListener={false} dragControls={controls}>
      <QuestionCard
        question={question}
        questionNumber={questionNumber}
        controls={controls}
        questionCardType="swap"
      />
    </Reorder.Item>
  );
};

export default QuestionCards;
