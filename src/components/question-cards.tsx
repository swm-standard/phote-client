'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/container';
import QuestionCard, { QuestionCardType } from '@/components/question-card';
import { IQuestion } from '@/model/i-question';
import ExpandedQuestionCard from '@/components/expanded-question-card';

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

  return (
    <Container className="flex flex-col">
      {questions.map((ques, idx) => (
        <ExpandWrapper
          key={ques.questionId}
          renderChildren={(isExpanded) =>
            isExpanded ? (
              <ExpandedQuestionCard
                key={ques.questionId}
                question={ques}
                questionNumber={idx + 1}
              />
            ) : questionCardType === 'default' ? (
              <QuestionCard
                key={ques.questionId}
                question={ques}
                questionNumber={idx + 1}
              />
            ) : questionCardType === 'check' ? (
              <QuestionCard
                key={ques.questionId}
                question={ques}
                questionNumber={idx + 1}
                questionCardType="check"
                isChecked={checkedQuestions?.includes(ques.questionId)}
                checkQuestion={checkQuestion}
                uncheckQuestion={uncheckQuestion}
              />
            ) : null
          }
        />
      ))}
    </Container>
  );
};

export default QuestionCards;

const ExpandWrapper = ({
  renderChildren,
}: {
  renderChildren: (isExpanded: boolean) => React.ReactNode;
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div role="button" className="w-full" onClick={handleClick}>
      {renderChildren(isExpanded)}
    </div>
  );
};
