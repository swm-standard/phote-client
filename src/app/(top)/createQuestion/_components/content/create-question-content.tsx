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

  const { register, setValue, watch, handleSubmit, control } =
    useForm<QuestionBase>({
      defaultValues: {
        statement: '',
        category: 'MULTIPLE',
        options: [],
        tags: [],
        answer: '',
        memo: '',
      },
    });
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

  const judgeLeftDisable = () => {
    switch (currentStep) {
      case 1:
        return false;
      case 2:
        return false;
      case 3:
        return false;
    }
  };

  const judgeRightDisable = () => {
    switch (currentStep) {
      case 1:
        return !image ? true : false;
      case 2:
        return false;
      case 3:
        return false;
    }
  };
  return (
    <Container className="flex flex-col">
      <section className="my-12 flex-grow">
        {currentStep === 1 ? (
          <UploadPicture
            image={image}
            imageUrl={imageUrl}
            handleImageChange={handleImageChange}
          />
        ) : currentStep === 2 ? (
          <CheckConvert
            register={register}
            setValue={setValue}
            watch={watch}
            optionFields={optionFields}
            appendOption={appendOption}
            removeOption={removeOption}
          />
        ) : (
          <AddExtraInfo register={register} watch={watch} setValue={setValue} />
        )}
      </section>

      <ProgressChangeFooter
        currentStep={currentStep}
        leftDisabled={judgeLeftDisable()}
        rightDisabled={judgeRightDisable()}
        handleLeftButtonClick={handleLeftButtonClick}
        handleRightButtonClick={handleRightButtonClick}
      />
    </Container>
  );
};

export default CreateQuestionContent;
