import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { readStudentResultOverview } from '@/api/exam-api';
import Loading from '@/components/ui/loading';
import Container from '@/components/container';
import TestCards from '@/app/(after-login)/(top)/test-detail/[testId]/_components/test-creator/test-cards';

const TestCreatorSection = () => {
  const { testId } = useParams<{ testId: string }>();

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['studentResultOverview'],
    queryFn: () => readStudentResultOverview(testId),
  });

  if (isFetching) return <Loading />;
  else if (isSuccess)
    return (
      <Container className="flex flex-col">
        <section className="flex-grow">
          <TestCards
            tests={data.students}
            totalQCnt={data.totalQuestionCount}
          />
        </section>
      </Container>
    );
  else return <div>error</div>;
};

export default TestCreatorSection;
