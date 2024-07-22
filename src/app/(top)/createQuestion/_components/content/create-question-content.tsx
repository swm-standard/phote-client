import React from 'react';
import Step from '@/app/(top)/createQuestion/_components/progress/types';
import UploadPicture from '@/app/(top)/createQuestion/_components/content/upload-picture';
import CheckConvert from '@/app/(top)/createQuestion/_components/content/check-convert';
import AddExtraInfo from '@/app/(top)/createQuestion/_components/content/add-extra-info';

const CreateQuestionContent = ({ currentStep }: { currentStep: Step }) => {
  return (
    <div>
      {currentStep === 1 ? (
        <UploadPicture />
      ) : currentStep === 2 ? (
        <CheckConvert />
      ) : (
        <AddExtraInfo />
      )}
    </div>
  );
};

export default CreateQuestionContent;
