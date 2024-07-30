import React, { useState } from 'react';
import { StepProps } from '@/app/(top)/createQuestion/_components/progress/types';
import {
  AddExtraInfo,
  CheckConvert,
  UploadPicture,
} from '@/app/(top)/createQuestion/_components/content';
import ProgressChangeFooter from '@/app/(top)/createQuestion/_components/progress/progress-change-footer';
import Container from '@/components/container';
import { QuestionBase } from '@/app/_lib/types';

import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { useImmer } from 'use-immer';

const CreateQuestionContent = (props: StepProps) => {
  const { currentStep, setToPrevStep, setToNextStep } = props;
  const router = useRouter();
  const [image, setInputImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { register, handleSubmit, control } = useForm<QuestionBase>();
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray<QuestionBase, 'options'>({
    control,
    name: 'options',
  });

  const [tags, updateTags] = useImmer<string[]>([]);
  const addTag = (tag: string) => {
    updateTags((draft) => {
      draft.push(tag);
    });
  };
  const removeTag = (targetTag: string) => {
    updateTags((draft) => draft.filter((tag) => tag !== targetTag));
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputImage(e.target.files && e.target.files[0]);
    e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const createQuestion = handleSubmit((data) => {
    console.log(data);
    console.log(tags);
  });

  const transformQuestion = async () => {
    console.log('문제 변환');
    setToNextStep();
  };

  const handleLeftButtonClick = () => {
    switch (currentStep) {
      case 1:
        setToNextStep();
        break;
      case 2:
        router.push('/createQuestion/intercepted/cancel-alert-dialog');
        break;
      case 3:
        setToPrevStep();
        break;
    }
  };

  const handleRightButtonClick = () => {
    switch (currentStep) {
      case 1:
        transformQuestion();
        break;
      case 2:
        setToNextStep();
        break;
      case 3:
        createQuestion();
        break;
    }
  };

  return (
    <Container className="flex flex-col">
      <section className="flex-grow">
        {currentStep === 1 ? (
          <UploadPicture
            image={image}
            imageUrl={imageUrl}
            handleImageChange={handleImageChange}
          />
        ) : currentStep === 2 ? (
          <CheckConvert
            register={register}
            optionFields={optionFields}
            appendOption={appendOption}
            removeOption={removeOption}
          />
        ) : (
          <AddExtraInfo
            register={register}
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
          />
        )}
      </section>

      <ProgressChangeFooter
        currentStep={currentStep}
        handleLeftButtonClick={handleLeftButtonClick}
        handleRightButtonClick={handleRightButtonClick}
      />
    </Container>
  );
};

export default CreateQuestionContent;
