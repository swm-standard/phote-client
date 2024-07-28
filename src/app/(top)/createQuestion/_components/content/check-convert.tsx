import React from 'react';
import { UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { Option, QuestionBase } from '@/app/_lib/types';

const CheckConvert = ({
  register,
  optionFields,
  appendOption,
  removeOption,
}: {
  register: UseFormRegister<QuestionBase>;
  optionFields: FieldArrayWithId[];
  appendOption: (obj: Option) => void;
  removeOption: (idx: number) => void;
}) => {
  const handleOptionAppendClick: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    appendOption({ value: '새로운 선택지' });
  };

  const handleOptionRemoveClick = (idx: number) => {
    removeOption(idx);
  };

  return (
    <form>
      <fieldset>
        <legend>문제설명</legend>
        <textarea {...register('statement')}></textarea>
      </fieldset>
      <fieldset>
        <legend>문제그림</legend>
        <input type="file" />
      </fieldset>
      <fieldset>
        <legend>문제 유형</legend>
        <label>
          <input {...register('category')} type="radio" value="MULTIPLE" />
          객관식
        </label>
        <label>
          <input {...register('category')} type="radio" value="ESSAY" />
          단답형
        </label>
      </fieldset>
      <fieldset>
        <legend>선택지</legend>
        <ul className="flex flex-col gap-4">
          {optionFields.map((field, idx) => (
            <li key={field.id} className="flex border-2">
              <input {...register(`options.${idx}.value`)} />
              <button
                type="button"
                onClick={() => handleOptionRemoveClick(idx)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleOptionAppendClick}>
          추가
        </button>
      </fieldset>
    </form>
  );
};

export default CheckConvert;
