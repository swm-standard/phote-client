import React, { useState } from 'react';
import Container from '@/components/container';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  AddExtraInfo,
  CheckConvert,
  UploadPicture,
} from '@/app/(after-login)/(top)/createQuestion/_components/content';

import ProgressChangeFooter from '@/app/(after-login)/(top)/createQuestion/_components/progress/progress-change-footer';
import { IStep } from '@/model/i-step';
import { EmptyCreateQuestion, ICreateQuestion } from '@/model/i-question';

export type StepProps = {
  step: IStep;
  prevStep: () => void;
  nextStep: () => void;
};

const CreateQuestionContent = ({ step, prevStep, nextStep }: StepProps) => {
  const [rawImage, setRawImage] = useState<{
    image: File | null;
    imageUrl: string | null;
  }>({
    image: null,
    imageUrl: null,
  });

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    setRawImage({
      image: file,
      imageUrl: file ? URL.createObjectURL(file) : null,
    });
  };

  const methods = useForm<ICreateQuestion>({
    defaultValues: EmptyCreateQuestion,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray<ICreateQuestion, 'options'>({
    control: methods.control,
    name: 'options',
  });

  return (
    <Container className="flex flex-col">
      <FormProvider {...methods}>
        <section className="my-12 flex-grow">
          {step === 1 ? (
            <UploadPicture
              imageUrl={rawImage.imageUrl}
              handleImageChange={handleImageChange}
            />
          ) : step === 2 ? (
            <CheckConvert
              optionFields={optionFields}
              appendOption={appendOption}
              removeOption={removeOption}
            />
          ) : (
            <AddExtraInfo />
          )}
        </section>

        <ProgressChangeFooter
          rawImage={rawImage.image}
          step={step}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      </FormProvider>
    </Container>
  );
};

export default CreateQuestionContent;
