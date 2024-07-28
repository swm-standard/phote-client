import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { QuestionBase } from '@/app/_lib/types';

export const AddExtraInfo = ({
  register,
  tags,
  addTag,
  removeTag,
}: {
  register: UseFormRegister<QuestionBase>;
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}) => {
  const [value, setValue] = useState<string>('');

  return (
    <form>
      <fieldset>
        <legend>정답</legend>
        <input {...register('answer')} />
      </fieldset>
      <fieldset>
        <legend>태그</legend>
        <input onChange={(e) => setValue(e.target.value)} />
        <button type="button" onClick={() => addTag(value)}>
          추가
        </button>
        <div className="flex gap-4">
          {tags.map((tag, idx) => (
            <div key={idx} className="border-2">
              <span>{tag}</span>
              <button type="button" onClick={() => removeTag(tag)}>
                X
              </button>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>메모</legend>
        <textarea {...register('memo')} />
      </fieldset>
    </form>
  );
};
