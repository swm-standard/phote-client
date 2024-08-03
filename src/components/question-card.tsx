import React, { useState } from 'react';
import { Question, QuestionCardType } from '@/app/_lib/types';
import { DragControls } from 'framer-motion';
import AngleRightIcon from '@/static/icons/angle-right-icon';
import TwoBarIcon from '@/static/icons/two-bar-icon';
import AngleDownIcon from '@/static/icons/angle-down-icon';
import InfoIcon from '@/static/icons/info-icon';
import Image from 'next/image';
import dummy from '@/static/images/dummy-image-square.jpg';
import NumberCircle from '@/components/number-circle';
import CheckCircleIcon from '@/static/icons/check-circle-icon';

const QuestionCard = ({
  question,
  questionNumber,
  questionCardType = 'default',
  controls,
  isChecked = false,
  checkQuestion,
  uncheckQuestion,
}: {
  question: Question;
  questionNumber: number;
  questionCardType?: QuestionCardType;
  controls?: DragControls;
  isChecked?: boolean;
  checkQuestion?: (id: string) => void;
  uncheckQuestion?: (id: string) => void;
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const category = question.category === 'ESSAY' ? '단답형' : '객관식';

  const handleExpandToggleClick: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    setExpanded((prev) => !prev);
  };

  const handleDragPointerDown: React.PointerEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    controls?.start(e);
  };

  const handleClickBlock: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!isExpanded && questionCardType === 'check') {
      isChecked
        ? uncheckQuestion && uncheckQuestion(question.id)
        : checkQuestion && checkQuestion(question.id);
    }
    e.stopPropagation();
  };

  return (
    <button type="button" className="w-full" onClick={handleExpandToggleClick}>
      <div className="border-b-[1px] border-brand-gray-heavy">
        <div
          className={`flex w-full items-center justify-between gap-2 bg-white p-4 ${isExpanded && 'pb-0'}`}
        >
          <div>
            {isExpanded ? (
              <AngleDownIcon className="h-4 w-4 text-text-001" />
            ) : (
              <AngleRightIcon className="h-4 w-4 text-text-001" />
            )}
          </div>
          <div className="flex-grow">
            <div className="flex gap-1 text-xs font-bold">
              <span className="text-text-004">{category}</span>
              {question.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-brand-blue-heavy"
                >{`#${tag}`}</span>
              ))}
            </div>
            {isExpanded ? (
              <p className="text-left text-base font-normal text-text-001">
                <span className="font-bold">{`Q${questionNumber} `}</span>
              </p>
            ) : (
              <p
                className={`line-clamp-1 text-left text-base font-normal text-text-001`}
              >
                <span className="font-bold">{`Q${questionNumber} `}</span>
                {question.statement}
              </p>
            )}
          </div>
          {!isExpanded &&
            (questionCardType === 'swap' ? (
              <button
                onClick={handleClickBlock}
                onPointerDown={handleDragPointerDown}
              >
                <TwoBarIcon className="h-4 w-4 text-text-003" />
              </button>
            ) : questionCardType === 'check' ? (
              <button onClick={handleClickBlock}>
                <CheckCircleIcon
                  className={`h-4 w-4 ${isChecked ? 'text-brand-blue-light' : 'text-text-004'}`}
                />
              </button>
            ) : null)}
          {isExpanded && (
            <button onClick={handleClickBlock}>
              <InfoIcon className="h-4 w-4 text-text-003" />
            </button>
          )}
        </div>
        {isExpanded && (
          <div className="flex flex-col gap-4 px-10 py-4">
            <div className="flex flex-col">
              <span className="text-left text-sm font-bold text-text-001">
                [ 문제 설명 ]
              </span>
              <p className="text-left text-base font-normal text-text-001">
                {question.statement}
              </p>
            </div>
            <Image src={dummy} alt="test" />
            <div className="flex flex-col gap-1">
              <span className="text-left text-sm font-bold text-text-001">
                [ 선택지 ]
              </span>
              <ul className="flex flex-col gap-1">
                {question.options.map((option, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-left">
                    <NumberCircle number={idx + 1} />
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default QuestionCard;
