'use client';

import {
  DragControls,
  motion,
  Reorder,
  useAnimate,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import Container from '@/components/container';
import QuestionCard, { QuestionCardType } from '@/components/question-card';
import { IQuestion } from '@/model/i-question';
import { updateQuestionSequence } from '@/app/(after-login)/(top)/workbookDetail/workbook-detail-api';
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
  const [debouncedQuestions] = useDebounce(questions, 2000);

  useEffect(() => {
    (async () => {
      await updateQuestionSequence({ workbookId, questions });
    })();
  }, [debouncedQuestions]);

  return (
    <Container className="flex flex-col">
      {questions.map((ques, idx) => (
        <ExpandWrapper
          key={ques.questionId}
          renderChildren={(isExpanded) =>
            isExpanded ? (
              <ExpandedQuestionCard question={ques} questionNumber={idx + 1} />
            ) : questionCardType === 'default' ? (
              <QuestionCard question={ques} questionNumber={idx + 1} />
            ) : questionCardType === 'swap' ? (
              <ReorderWrapper
                question={ques}
                renderChildren={(swapControls) => (
                  <SlideWrapper
                    isExpanded={isExpanded}
                    renderChildren={(isSlided, isSliding) => (
                      <QuestionCard
                        question={ques}
                        questionNumber={idx + 1}
                        controls={swapControls}
                        questionCardType="swap"
                      />
                    )}
                  />
                )}
              />
            ) : questionCardType === 'check' ? (
              <QuestionCard
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

const ExpandWrapper = ({
  renderChildren,
}: {
  renderChildren: (isExpanded: boolean) => React.ReactNode;
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragStartPos.current) {
      const dx = Math.abs(e.clientX - dragStartPos.current.x);
      const dy = Math.abs(e.clientY - dragStartPos.current.y);
      if (dx > 5 || dy > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!isDragging) {
      setExpanded((prev) => !prev);
    }
    setIsDragging(false);
    dragStartPos.current = null;
  };

  return (
    <div
      role="button"
      className="w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {renderChildren(isExpanded)}
    </div>
  );
};

const ReorderWrapper = ({
  renderChildren,
  question,
}: {
  renderChildren: (swapControls: DragControls) => React.ReactNode;
  question: IQuestion;
}) => {
  const swapControls = useDragControls();

  return (
    <Reorder.Item
      value={question}
      dragListener={false}
      dragControls={swapControls}
    >
      {renderChildren(swapControls)}
    </Reorder.Item>
  );
};

const SlideWrapper = ({
  isExpanded,
  renderChildren,
}: {
  isExpanded: boolean;
  renderChildren: (isSlided: boolean, setIsSliding: boolean) => React.ReactNode;
}) => {
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  const x = useMotionValue(0);
  const [scope, animate] = useAnimate();

  const handleDragStart = () => {
    setIsSliding(true);
  };

  const handleDragEnd = () => {
    setIsSliding(false);

    const latestX = x.get();
    if (latestX < -50) {
      setIsSlided(true);
      animate(
        scope.current,
        { x: -100 },
        {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.5,
        },
      );
    } else {
      setIsSlided(false);
      animate(
        scope.current,
        { x: 0 },
        {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.5,
        },
      );
    }
  };

  return (
    <div className="relative">
      <button className="absolute right-0 top-0 z-10 h-full w-full bg-red-500">
        삭제
      </button>
      <motion.div
        ref={scope}
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -300, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative z-20"
      >
        {renderChildren(isSlided, isSliding)}
      </motion.div>
    </div>
  );
};

export default QuestionCards;
