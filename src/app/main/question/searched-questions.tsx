import React, { useEffect, useState } from 'react';
import { Question, Status } from '@/app/types';
import QuestionCards from '@/components/question-card';

const SearchedQuestions = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      <QuestionCards questions={questions} />
    </div>
  );
};

export default SearchedQuestions;
