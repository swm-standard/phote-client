import React from 'react';
import { IQuestion } from '@/model/i-question';
import Image from 'next/image';
import NumberCircle from '@/components/number-circle';
import { useFormContext } from 'react-hook-form';
import { Answers } from '@/app/(after-login)/(top)/take-exam/[workbookId]/page';
import Legend from '@/components/legend';

const ExamCard = ({ question, idx }: { question: IQuestion; idx: number }) => {
  const { register, setValue, watch } = useFormContext<Answers>();
  const values = watch();

  const handleAnswerClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setValue(`answers.${idx}.answer`, e.currentTarget.value);
  };

  const isBlue = (num: string) => {
    return values.answers[idx]?.answer === num;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <Legend className="mb-2">문제 설명</Legend>
        <p className="text-left text-base font-normal text-text-001">
          {question.statement}
        </p>
      </div>
      {question.image && (
        <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg">
          <Image src={question.image} alt="문제" fill />
        </div>
      )}
      <fieldset>
        <Legend className="mb-2">정답</Legend>
        {question.category === 'ESSAY' && (
          <input
            placeholder="정답을 입력해주세요."
            {...register(`answers.${idx}.answer`)}
            maxLength={25}
          />
        )}
        {question.category === 'MULTIPLE' && (
          <ul className="flex flex-col gap-4">
            {question.options.map((option, idx) => (
              <li key={idx}>
                <button
                  onClick={handleAnswerClick}
                  value={`${idx + 1}`}
                  className="flex items-center gap-4"
                >
                  <NumberCircle
                    isBlue={isBlue(`${idx + 1}`)}
                    number={idx + 1}
                    className="mb-[1px]"
                  />
                  <section className="flex-grow">
                    <p>{option}</p>
                  </section>
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>
    </div>
  );
};

export default ExamCard;
