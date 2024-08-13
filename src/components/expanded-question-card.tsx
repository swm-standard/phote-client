import React from 'react';
import AngleDownIcon from '@/static/icons/angle-down-icon';
import InfoIcon from '@/static/icons/info-icon';
import Image from 'next/image';
import dummy from '@/static/images/dummy-image-square.jpg';
import NumberCircle from '@/components/number-circle';
import { IQuestion } from '@/model/i-question';
import { QuestionCardType } from '@/components/question-card';

const ExpandedQuestionCard = ({
  question,
  questionNumber,
  questionCardType = 'default',
}: {
  question: IQuestion;
  questionNumber: number;
  questionCardType?: QuestionCardType;
}) => {
  const category = question.category === 'ESSAY' ? '단답형' : '객관식';

  return (
    <div role="button" className="bg-white">
      <div className="border-b-[1px] border-brand-gray-heavy">
        <div className="flex w-full items-center justify-between gap-2 bg-white p-4 pb-0">
          <div>
            <AngleDownIcon className="h-4 w-4 text-text-001" />
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
            <p className="text-left text-base font-normal text-text-001">
              {questionCardType === 'swap' && (
                <span className="font-bold">{`Q${questionNumber} `}</span>
              )}
            </p>
          </div>
          <button>
            <InfoIcon className="h-4 w-4 text-text-003" />
          </button>
        </div>

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
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedQuestionCard;
