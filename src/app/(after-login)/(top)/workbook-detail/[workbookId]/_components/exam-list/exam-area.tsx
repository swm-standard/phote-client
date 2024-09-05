import React from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import PlusIcon from '@/static/icons/plus-icon';
import { useQuery } from '@tanstack/react-query';
import { readExamHistories } from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/workbook-detail-api';
import Loading from '@/components/ui/loading';
import ExamCards from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/exam-list/exam-cards';

const WorkbookQuestionArea = () => {
  const { workbookId } = useParams<{ workbookId: string }>();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['examHistory'],
    queryFn: () => readExamHistories(workbookId),
  });

  if (isFetching) return <Loading />;
  else if (isError) return <div>Question Data fetch Error</div>;
  return (
    <Container className="flex flex-col">
      <section className="flex-grow">
        <ExamCards exams={data} />
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
