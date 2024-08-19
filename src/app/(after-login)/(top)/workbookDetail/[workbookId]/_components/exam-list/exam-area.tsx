import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import PlusIcon from '@/static/icons/plus-icon';
import { IExam } from '@/model/i-exam';
import ExamCards from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/exam-list/exam-cards';

const WorkbookQuestionArea = () => {
  const [exams, setExams] = useState<IExam[]>([
    { examId: '1', totalQuantity: 5, totalCorrect: 4, time: 40, sequence: 1 },
  ]);
  const { workbookId } = useParams<{ workbookId: string }>();

  // if (isPending) return <div>loading..</div>;
  // else if (isError) return <div>Question Data fetch Error</div>;
  return (
    <Container className="flex flex-col bg-white">
      <section className="flex-grow">
        <ExamCards exams={exams} />
      </section>

      <div className="sticky bottom-4 my-4 w-full px-4">
        <BarButton
          icon={PlusIcon}
          barButtonType="link"
          href={`/take-exam/${workbookId}`}
        >
          시험 보기
        </BarButton>
      </div>
    </Container>
  );
};

export default WorkbookQuestionArea;
