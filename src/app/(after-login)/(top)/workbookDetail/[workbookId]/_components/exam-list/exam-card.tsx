import React from 'react';
import { IExam } from '@/model/i-exam';
import Link from 'next/link';

const ExamCard = ({ exam }: { exam: IExam }) => {
  return (
    <Link
      href={`/exam-detail/${exam.examId}`}
      className="flex items-center justify-center gap-20 border-b-[1px] border-brand-gray-heavy bg-inherit px-4 py-4"
    >
      <WordChunk
        label="총 점수"
        value={`${(exam.totalCorrect / exam.totalQuantity) * 100}점`}
      />
      <WordChunk label="걸린 시간" value={`${exam.time}분`} />
      <WordChunk label="시험" value={`${exam.sequence}번째 시험`} />
    </Link>
  );
};

const WordChunk = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-xs font-normal text-text-003">{label}</p>
      <p className="text-base font-semibold text-text-001">{value}</p>
    </div>
  );
};

export default ExamCard;