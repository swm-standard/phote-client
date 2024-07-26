import React, { useState } from 'react';
import { StepProps } from '@/app/(top)/createQuestion/_components/progress/types';
import UploadPicture from './upload-picture';
import CheckConvert from './check-convert';
import AddExtraInfo from './add-extra-info';
import ProgressChangeFooter from '@/app/(top)/createQuestion/_components/progress/progress-change-footer';
import Container from '@/components/container';
import { useRouter } from 'next/navigation';
import { QuestionBase } from '@/app/_lib/types';
import { useForm } from 'react-hook-form';

const CreateQuestionContent = (props: StepProps) => {
  const { currentStep, setToPrevStep, setToNextStep } = props;
  const router = useRouter();
  const [image, setInputImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    // formState: { erros },
  } = useForm<QuestionBase>();

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputImage(e.target.files && e.target.files[0]);
    e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const createQuestion = handleSubmit((data) => {
    console.log(data);
    // router.push('question');
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
        router.replace('/createQuestion/intercepted/cancel-alert-dialog');
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
      <section className="flex-grow ">
        {currentStep === 1 ? (
          <UploadPicture
            image={image}
            imageUrl={imageUrl}
            handleImageChange={handleImageChange}
          />
        ) : currentStep === 2 ? (
          <CheckConvert register={register} />
        ) : (
          <AddExtraInfo register={register} />
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
