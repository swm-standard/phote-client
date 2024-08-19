import React from 'react';
import { IExam } from '@/model/i-exam';
import Container from '@/components/container';
import ExamCard from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/exam-list/exam-card';

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
