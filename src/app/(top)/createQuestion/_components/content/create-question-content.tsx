import React, { useState } from 'react';
import {
  Step,
  StepProps,
} from '@/app/(top)/createQuestion/_components/progress/types';
import UploadPicture from '@/app/(top)/createQuestion/_components/content/upload-picture';
import CheckConvert from '@/app/(top)/createQuestion/_components/content/check-convert';
import AddExtraInfo from '@/app/(top)/createQuestion/_components/content/add-extra-info';
import ProgressChangeFooter from '@/app/(top)/createQuestion/_components/progress/progress-change-footer';
import Container from '@/components/container';
import { useRouter } from 'next/navigation';

const CreateQuestionContent = (props: StepProps) => {
  const { currentStep, setToPrevStep, setToNextStep } = props;
  const router = useRouter();
  const [image, setInputImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputImage(e.target.files && e.target.files[0]);
    e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleLeftButtonClick = () => {
    switch (currentStep) {
      case 1:
        setToNextStep();
        break;
      case 2:
        setToPrevStep();
        // input들 초기화
        break;
      case 3:
        setToPrevStep();
        break;
    }
  };

  const handleRightButtonClick = () => {
    switch (currentStep) {
      case 1:
        setToNextStep();
        // 경고창
        // 변환 로직 및 image null
        break;
      case 2:
        setToNextStep();
        break;
      case 3:
        router.push('question');
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
          <CheckConvert />
        ) : (
          <AddExtraInfo />
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
