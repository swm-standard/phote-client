import React from 'react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';
import { Option } from '@/app/_lib/types';
import Legend from '@/components/legend';
import Textarea from '@/components/textarea';
import Image from 'next/image';
import SquareButton from '@/components/square-button';
import NumberCircle from '@/components/number-circle';
import LinedInput from '@/components/lined-input';
import XCircleIcon from '@/static/icons/x-circle-icon';
import CirclePlusIcon from '@/static/icons/circle-plus-icon';

export const CheckConvert = ({
  optionFields,
  appendOption,
  removeOption,
}: {
  optionFields: FieldArrayWithId[];
  appendOption: (obj: Option) => void;
  removeOption: (idx: number) => void;
}) => {
  const { register, setValue, watch } = useFormContext();

  const handleOptionAppendClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    appendOption({ value: '' });
  };

  const handleOptionRemoveClick = (idx: number) => {
    removeOption(idx);
  };

  const values = watch();
  const state: { statement: 'filled' | 'empty' | 'focused' } = {
    statement: values.statement ? 'filled' : 'empty',
  };

  const length = {
    statement: values.statement?.length || 0,
  };

  const handleMultipleButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setValue('category', 'MULTIPLE');
  };

  const handleEssayButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setValue('category', 'ESSAY');
  };

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <Legend required className="mb-2 text-sm">
          문제설명
        </Legend>
        <Textarea
          className="h-20 w-full"
          register={register('statement')}
          placeholder="문제 설명을 입력해주세요."
          state={state.statement}
          textLength={length.statement}
          maxLength={300}
        />
      </fieldset>
      {values.image && (
        <fieldset>
          <Legend className="mb-2 text-sm">문제 그림</Legend>
          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg">
            <Image src={values.image} alt="문제" fill />
          </div>
        </fieldset>
      )}
      <fieldset>
        <Legend className="mb-2 text-sm" required>
          문제 유형
        </Legend>
        <div className="flex gap-2">
          <SquareButton
            theme={values.category === 'MULTIPLE' ? 'lightblue' : 'lightgray'}
            className="flex-grow py-2"
            onClick={handleMultipleButtonClick}
          >
            객관식
          </SquareButton>
          <SquareButton
            theme={values.category === 'ESSAY' ? 'lightblue' : 'lightgray'}
            className="flex-grow py-2"
            onClick={handleEssayButtonClick}
          >
            단답형
          </SquareButton>
        </div>
      </fieldset>
      {values.category === 'MULTIPLE' && (
        <fieldset>
          <Legend required className="mb-2 text-sm">
            선택지
          </Legend>
          <ul className="flex flex-col gap-4">
            {optionFields.map((field, idx) => (
              <li key={field.id} className="flex items-center gap-4">
                <NumberCircle number={idx + 1} className="mb-[1px]" />
                <section className="flex-grow">
                  <LinedInput
                    register={register(`options.${idx}.value`)}
                    placeholder="선택지를 입력해주세요."
                    textLength={values.options[`${idx}`].value.length}
                    maxLength={25}
                  />
                </section>
                <button
                  type="button"
                  onClick={() => handleOptionRemoveClick(idx)}
                >
                  <XCircleIcon className="h-3.5 w-3.5 text-text-004" />
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleOptionAppendClick}
                className="flex items-center gap-2 text-brand-blue-heavy"
              >
                <CirclePlusIcon className="h-3.5 w-3.5" />
                <p className="text-sm font-medium">선지 추가</p>
              </button>
            </li>
          </ul>
        </fieldset>
      )}
    </div>
  );
};
