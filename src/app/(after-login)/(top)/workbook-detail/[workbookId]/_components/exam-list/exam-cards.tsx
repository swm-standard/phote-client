import React from 'react';
import { IExam } from '@/model/i-exam';
import Link from 'next/link';
import Container from '@/components/container';
import { fixFloatPoint } from '@/lib/utils';

export const ExamCard = ({ exam }: { exam: IExam }) => {
  return (
    <Link
      href={`/exam-detail/${exam.examId}`}
      className="flex justify-between border-b-[1px] border-brand-gray-heavy bg-inherit bg-white px-8 py-4"
    >
      <WordChunk
        label="총 점수"
        value={`${fixFloatPoint((exam.totalCorrect / exam.totalQuantity) * 100)}점`}
      />
      <WordChunk label="걸린 시간" value={`${exam.time}분`} />
      <WordChunk label="시험" value={`${exam.sequence}번째 시험`} />
    </Link>
  );
};

export const WordChunk = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <p className="text-xs font-normal text-text-003">{label}</p>
      <p className="text-base font-semibold text-text-001">{value}</p>
    </div>
  );
};

const ExamCards = ({ exams }: { exams: IExam[] }) => {
  return (
    <Container>
      {exams.map((exam) => (
        <ExamCard key={exam.examId} exam={exam} />
      ))}
    </Container>
  );
};

export default ExamCards;
