import React, { useState } from 'react';
import { QuestionInWorkbook } from '@/app/types';

const QuestionCard = ({ question }: { question: QuestionInWorkbook }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const handleExpandToggleClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setExpanded((prev) => !prev);
  };

  if (!isExpanded) {
    return (
      <div className="flex p-4 border-[1px]">
        <button onClick={handleExpandToggleClick}>▶️</button>
        <p>{`Q${question.sequence}`}</p>
        <p>{question.category}</p>
        {question.tags.map((tag, idx) => (
          <p key={idx}>{tag}</p>
        ))}
        <p>{question.statement}</p>
        <button>=</button>
      </div>
    );
  } else {
    return (
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
    );
  }
};

export default QuestionCard;
