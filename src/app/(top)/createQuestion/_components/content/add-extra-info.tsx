import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { QuestionBase } from '@/app/_lib/types';

const AddExtraInfo = ({
  register,
}: {
  register: UseFormRegister<QuestionBase>;
}) => {
  return (
    <form>
      <fieldset>
        <legend>정답</legend>
        <input {...register('answer')} />
      </fieldset>
      <fieldset>
        <legend>태그</legend>
        <input />
      </fieldset>
      <fieldset>
        <legend>메모</legend>
        <textarea {...register('memo')} />
      </fieldset>
    </form>
  );
};

export default AddExtraInfo;
