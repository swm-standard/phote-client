import React from 'react';
import SquareButton from '@/components/square-button';

const ExamFooter = ({
  currentQuestion,
  maxQuestion,
  prevQuestion,
  nextQuestion,
  handleSubmitClick,
}: {
  currentQuestion: number;
  maxQuestion: number;
  prevQuestion: () => void;
  nextQuestion: () => void;
  handleSubmitClick: () => Promise<void>;
}) => {
  return (
    <div className="flex justify-end gap-2 p-2">
      <SquareButton className="px-3" onClick={prevQuestion} theme="blue">
        이전
      </SquareButton>
      {currentQuestion !== maxQuestion ? (
        <SquareButton className="px-3" onClick={nextQuestion} theme="blue">
          다음
        </SquareButton>
      ) : (
        <SquareButton className="px-3" onClick={handleSubmitClick} theme="blue">
          제출
        </SquareButton>
      )}
    </div>
  );
};

export default ExamFooter;
