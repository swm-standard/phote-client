import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { QuestionBase } from '@/app/_lib/types';

const CheckConvert = ({
  register,
}: {
  register: UseFormRegister<QuestionBase>;
}) => {
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
        <ul>
          <li>
            <input readOnly value="선택지1" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default CheckConvert;
