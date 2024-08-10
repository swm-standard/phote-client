'use client';

import {
  DragControls,
  motion,
  Reorder,
  useAnimate,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import Container from '@/components/container';
import QuestionCard from '@/components/question-card';
import { IQuestion } from '@/model/i-question';
import { updateQuestionSequence } from '@/app/(after-login)/(top)/workbookDetail/workbook-detail-api';
import ExpandedQuestionCard from '@/components/expanded-question-card';

export type Interaction = {
  questionId: string;
  type: 'expanded' | 'pushed' | 'pushing' | 'swapping';
} | null;

const QuestionCardsDetail = ({ questions }: { questions: IQuestion[] }) => {
  const { workbookId } = useParams<{ workbookId: string }>();
  const [debouncedQuestions] = useDebounce(questions, 2000);

  const [interaction, setInteraction] = useState<Interaction>(null);

  useEffect(() => {
    (async () => {
      await updateQuestionSequence({ workbookId, questions });
    })();
  }, [debouncedQuestions]);

  return (
    <Container className="flex flex-col">
      <h1>{interaction?.type ? interaction.type : 'base'}</h1>
      {questions.map((ques, idx) => (
        <ExpandWrapper
          key={ques.questionId}
          questionId={ques.questionId}
          interaction={interaction}
          setInteraction={setInteraction}
        >
          {interaction?.type === 'expanded' &&
          interaction.questionId === ques.questionId ? (
            <ExpandedQuestionCard question={ques} questionNumber={idx + 1} />
          ) : (
            <PushWrapper
              questionId={ques.questionId}
              interaction={interaction}
              setInteraction={setInteraction}
            >
              <ReorderWrapper
                key={ques.questionId}
                question={ques}
                renderChildren={(swapControls) => (
                  <QuestionCard
                    question={ques}
                    questionNumber={idx + 1}
                    controls={swapControls}
                    interaction={interaction}
                    setInteraction={setInteraction}
                    questionCardType="swap"
                  />
                )}
              />
            </PushWrapper>
          )}
        </ExpandWrapper>
      ))}
    </Container>
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

const ExpandWrapper = ({
  children,
  questionId,
  interaction,
  setInteraction,
}: {
  children: React.ReactNode;
  questionId: string;
  interaction: Interaction;
  setInteraction: (interaction: Interaction) => void;
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (interaction?.questionId !== questionId)
      setInteraction({ questionId, type: 'expanded' });
    if (interaction?.type === 'pushed') return;
    if (interaction?.questionId === questionId) setInteraction(null);
  };

  return (
    <div role="button" onClick={handleClick}>
      {children}
    </div>
  );
};

const PushWrapper = ({
  questionId,
  interaction,
  setInteraction,
  children,
}: {
  questionId: string;
  interaction: Interaction;
  setInteraction: (interaction: Interaction) => void;
  children: React.ReactNode;
}) => {
  const x = useMotionValue(0);
  const [scope, animate] = useAnimate();

  const handleDragStart = () => {
    if (interaction?.type === 'swapping') return;
    setInteraction({ questionId, type: 'pushed' });
  };

  useEffect(() => {
    if (
      questionId !== interaction?.questionId ||
      interaction?.type !== 'pushed'
    ) {
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
  }, [interaction]);

  const handleDragEnd = () => {
    const latestX = x.get();
    if (latestX < 0) {
      animate(
        scope.current,
        { x: -100 },
        {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        },
      );
      setInteraction({ questionId, type: 'pushed' });
    } else {
      animate(
        scope.current,
        { x: 0 },
        {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        },
      );
      setInteraction(null);
    }
  };

  return (
    <div className="relative">
      {questionId === interaction?.questionId &&
        (interaction?.type === 'pushed' || interaction?.type === 'pushing') && (
          <button className="absolute right-0 top-0 h-full w-[100px] bg-red-500">
            삭제
          </button>
        )}

      <motion.div
        ref={scope}
        drag={
          questionId === interaction?.questionId &&
          interaction.type !== 'pushed' &&
          interaction.type !== 'pushing'
            ? false
            : 'x'
        }
        style={{ x }}
        dragConstraints={{ left: -200, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default QuestionCardsDetail;
