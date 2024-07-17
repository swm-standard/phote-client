import React, { useState } from 'react';
import { QuestionInWorkbook } from '@/app/types';
import { Reorder, useDragControls } from 'framer-motion';

const QuestionCard = ({
  question,
  handleDrag,
}: {
  question: QuestionInWorkbook;
  handleDrag?: React.PointerEventHandler<HTMLButtonElement>;
}) => {
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

export default QuestionCard;
