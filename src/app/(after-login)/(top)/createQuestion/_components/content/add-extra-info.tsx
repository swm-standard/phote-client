import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import Legend from '@/components/legend';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import Tag from '@/components/tag';
import { ICreateQuestion } from '@/model/i-question';

export const AddExtraInfo = () => {
  const { register, setValue, watch } = useFormContext<ICreateQuestion>();
  const values = watch();

  const {
    register: tagRegister,
    watch: tagWatch,
    reset: tagReset,
  } = useForm<{
    tagInput: string;
  }>({
    defaultValues: {
      tagInput: '',
    },
  });
  const tagValue = tagWatch();

  const handleEnterDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;
    setValue('tags', [...values.tags, tagValue.tagInput]);
    tagReset();
  };

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <Legend required className="mb-2">
          정답
        </Legend>
        <Input
          placeholder="정답을 입력해주세요."
          register={register('answer')}
          state={values.answer?.length > 0 ? 'filled' : 'empty'}
          textLength={values.answer?.length}
          maxLength={25}
        />
      </fieldset>
      <fieldset>
        <Legend className="mb-2">태그</Legend>
        <Input
          register={tagRegister('tagInput')}
          textLength={tagValue.tagInput?.length}
          maxLength={25}
          onKeyDown={handleEnterDown}
        />
        <div className="mt-2 flex gap-4">
          {values.tags?.map((tag, idx) => (
            <Tag
              tag={tag}
              key={idx}
              removeTag={() => {
                setValue(
                  'tags',
                  values.tags.filter((t) => t !== tag),
                );
              }}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <Legend className="mb-2">메모</Legend>
        <Textarea
          className="h-32 w-full"
          register={register('memo')}
          placeholder="자유롭게 작성하세요."
          state={values.memo?.length > 0 ? 'filled' : 'empty'}
          textLength={values.memo?.length}
          maxLength={100}
        />
      </fieldset>
    </div>
  );
};
