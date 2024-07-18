import React, { useEffect, useState } from 'react';
import { QuestionInWorkbook, Status } from '@/app/types';
import { Reorder, useDragControls } from 'framer-motion';
import { BASE_URL } from '@/app/constants';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

const QuestionCard = ({ question }: { question: QuestionInWorkbook }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const controls = useDragControls();

  const handleExpandToggleClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setExpanded((prev) => !prev);
  };

  const handleDragPointerDown: React.PointerEventHandler<HTMLButtonElement> = (
    e,
  ) => controls.start(e);

  if (!isExpanded) {
    return (
      <Reorder.Item
        value={question}
        dragListener={false}
        dragControls={controls}
      >
        <div className="flex p-4 border-[1px]">
          <button onClick={handleExpandToggleClick}>▶️</button>
          <p>{`Q${question.sequence}`}</p>
          <p>{question.category}</p>
          {question.tags.map((tag, idx) => (
            <p key={idx}>{tag}</p>
          ))}
          <p>{question.statement}</p>
          <button onPointerDown={handleDragPointerDown}>=</button>
        </div>
      </Reorder.Item>
    );
  } else {
    return (
      <Reorder.Item
        value={question}
        dragListener={false}
        dragControls={controls}
      >
        <div className="flex flex-col p-4 border-[1px]">
          <div className="flex">
            <button onClick={handleExpandToggleClick}>🔽</button>
            <p>{`Q${question.sequence}`}</p>
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
      </Reorder.Item>
    );
  }
};

const QuestionCards = ({ questions }: { questions: QuestionInWorkbook[] }) => {
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
    updateQuestionSequence();
  }, [debouncedQuestions]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <p>{`question_swap_status:${status}`}</p>
      <p>{`API calls : ${countApiCalls}`}</p>
      {questions.map((ques) => (
        <QuestionCard key={ques.id} question={ques} />
      ))}
    </div>
  );
};

export default QuestionCards;
