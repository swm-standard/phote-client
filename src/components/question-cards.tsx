'use client';

import { Reorder, useDragControls } from 'framer-motion';
import React, { Fragment, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import Container from '@/components/container';
import QuestionCard, { QuestionCardType } from '@/components/question-card';
import { IQuestion } from '@/model/i-question';
import { updateQuestionSequence } from '@/app/(after-login)/(top)/workbookDetail/workbook-detail-api';

const QuestionCards = ({
  questions,
  questionCardType = 'default',
  checkedQuestions,
  checkQuestion,
  uncheckQuestion,
}: {
  questions: IQuestion[];
  questionCardType?: QuestionCardType;
  checkedQuestions?: string[];
  checkQuestion?: (id: string) => void;
  uncheckQuestion?: (id: string) => void;
}) => {
  const { workbookId } = useParams<{ workbookId: string }>();
  const [debouncedQuestions] = useDebounce(questions, 2000);

  useEffect(() => {
    (async () => {
      await updateQuestionSequence({ workbookId, questions });
    })();
  }, [debouncedQuestions]);

  return (
    <Container className="flex flex-col">
      {questions.map((ques, idx) => (
        <Fragment key={ques.questionId}>
          {questionCardType === 'default' ? (
            <QuestionCard question={ques} questionNumber={idx + 1} />
          ) : questionCardType === 'swap' ? (
            <ReorderWrapper question={ques} questionNumber={idx + 1} />
          ) : questionCardType === 'check' ? (
            <QuestionCard
              question={ques}
              questionNumber={idx + 1}
              questionCardType="check"
              isChecked={checkedQuestions?.includes(ques.questionId)}
              checkQuestion={checkQuestion}
              uncheckQuestion={uncheckQuestion}
            />
          ) : null}
        </Fragment>
      ))}
    </Container>
  );
};

const ReorderWrapper = ({
  question,
  questionNumber,
}: {
  question: IQuestion;
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
