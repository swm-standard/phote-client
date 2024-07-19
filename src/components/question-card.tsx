import React, { useEffect, useState } from 'react';
import { Question, Status } from '@/app/types';
import { DragControls, Reorder, useDragControls } from 'framer-motion';
import { BASE_URL } from '@/app/constants';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

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
        allowSwap
      />
    </Reorder.Item>
  );
};

const QuestionCard = ({
  question,
  questionNumber,
  allowSwap = false,
  controls,
}: {
  question: Question;
  questionNumber: number;
  allowSwap?: boolean;
  controls?: DragControls;
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const handleExpandToggleClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setExpanded((prev) => !prev);
  };

  const handleDragPointerDown: React.PointerEventHandler<HTMLButtonElement> = (
    e,
  ) => controls?.start(e);

  if (!isExpanded) {
    return (
      <div className="flex p-4 border-[1px]">
        <button onClick={handleExpandToggleClick}>▶️</button>
        <p>{`Q${questionNumber}`}</p>
        <p>{question.category}</p>
        {question.tags.map((tag, idx) => (
          <p key={idx}>{tag}</p>
        ))}
        <p>{question.statement}</p>
        {allowSwap && <button onPointerDown={handleDragPointerDown}>=</button>}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-4 border-[1px]">
        <div className="flex">
          <button onClick={handleExpandToggleClick}>🔽</button>
          <p>{`Q${questionNumber}`}</p>
          <p>{question.category}</p>
          {question.tags.map((tag, idx) => (
            <p key={idx}>{tag}</p>
          ))}
          <p>{question.statement}</p>
          <button>ℹ️</button>
        </div>
        <img src={question.image} alt="사진 로드 실패" />
        <div>문제 설명</div>
        <p>{question.statement}</p>
        <div>선택지</div>
        <div className="flex">
          {question.options.map((option, idx) => (
            <p key={idx}>{`${idx + 1} ${option}`}</p>
          ))}
        </div>
      </div>
    );
  }
};

const QuestionCards = ({
  questions,
  allowSwap = false,
}: {
  // questions: QuestionInWorkbook[];
  questions: Question[];
  allowSwap?: boolean;
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [countApiCalls, setCountApiCalls] = useState<number>(0);
  const params = useParams<{ workbookId: string }>();
  const [debouncedQuestions] = useDebounce(questions, 2000);

  const updateQuestionSequence = async () => {
    if (!allowSwap) return;
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
    <div className="flex flex-col gap-4 p-4">
      {allowSwap && (
        <>
          <p>Debounce Check</p>
          <p>{`question_swap_status:${status}`}</p>
          <p>{`API calls : ${countApiCalls}`}</p>
        </>
      )}
      {questions.map((ques, idx) => {
        if (allowSwap)
          return (
            <ReorderWrapper
              key={ques.id}
              question={ques}
              questionNumber={idx + 1}
            />
          );
        else
          return (
            <QuestionCard
              key={ques.id}
              question={ques}
              questionNumber={idx + 1}
            />
          );
      })}
    </div>
  );
};

export default QuestionCards;
