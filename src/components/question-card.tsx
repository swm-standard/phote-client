'use client';

import React from 'react';
import { DragControls } from 'framer-motion';
import TwoBarIcon from '@/static/icons/two-bar-icon';
import CheckCircleIcon from '@/static/icons/check-circle-icon';
import { IQuestion } from '@/model/i-question';
import AngleRightIcon from '@/static/icons/angle-right-icon';
import { Interaction } from '@/components/question-cards-detail';

export type QuestionCardType = 'default' | 'swap' | 'check';

const QuestionCard = ({
  question,
  questionNumber,
  questionCardType = 'default',
  controls,
  isChecked = false,
  checkQuestion,
  uncheckQuestion,
  interaction,
  setInteraction,
}: {
  question: IQuestion;
  questionNumber: number;
  questionCardType?: QuestionCardType;
  controls?: DragControls;
  isChecked?: boolean;
  interaction?: Interaction;
  setInteraction?: (interaction: Interaction) => void;
  checkQuestion?: (id: string) => void;
  uncheckQuestion?: (id: string) => void;
}) => {
  const category = question.category === 'ESSAY' ? '단답형' : '객관식';

  const handleDragPointerDown: React.PointerEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    if (interaction?.type === 'pushed') return;
    setInteraction &&
      setInteraction({ questionId: question.questionId, type: 'swapping' });
    controls?.start(e);
  };

  const handleDragPointerUp: React.PointerEventHandler<
    HTMLButtonElement
  > = () => {
    if (interaction?.type === 'pushed') return;
    setInteraction && setInteraction(null);
  };

  const handleClickBlock: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (questionCardType === 'check') {
      isChecked
        ? uncheckQuestion && uncheckQuestion(question.questionId)
        : checkQuestion && checkQuestion(question.questionId);
    }
    e.stopPropagation();
  };

  return (
    <div role="button" className="w-full bg-white">
      <div className="border-b-[1px] border-brand-gray-heavy">
        <div className="flex w-full items-center justify-between gap-2 bg-white p-4">
          <div>
            <AngleRightIcon className="h-4 w-4 text-text-001" />
          </div>
          <div className="flex-grow">
            <div className="flex gap-1 text-xs font-bold">
              <span className="text-text-004">{category}</span>
              {question.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-brand-blue-heavy"
                >{`#${tag.name}`}</span>
              ))}
            </div>
            <p
              className={`line-clamp-1 text-left text-base font-normal text-text-001`}
            >
              {questionCardType === 'swap' && (
                <span className="font-bold">{`Q${questionNumber} `}</span>
              )}
              {question.statement}
            </p>
          </div>
          {questionCardType === 'swap' ? (
            <button
              onClick={handleClickBlock}
              onPointerDown={handleDragPointerDown}
              onPointerUp={handleDragPointerUp}
            >
              <TwoBarIcon className="h-4 w-4 text-text-003" />
            </button>
          ) : questionCardType === 'check' ? (
            <button onClick={handleClickBlock}>
              <CheckCircleIcon
                className={`h-4 w-4 ${isChecked ? 'text-brand-blue-light' : 'text-text-004'}`}
              />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
