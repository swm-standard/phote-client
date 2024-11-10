'use client';

import Container from '@/components/container';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import { readAllSharedExams } from '@/api/exam-api';
import TestCards from '@/app/(after-login)/(nav)/test/_components/test-cards';

const TestArea = () => {
  const { data, isError, isFetching, isSuccess } = useQuery({
    queryKey: ['all-exams'],
    queryFn: readAllSharedExams,
  });

  if (isFetching) {
    return <Loading />;
  } else if (isSuccess) {
    return (
      <Container className="flex flex-col">
        <p className="sticky -top-1 bg-app-bg py-4 text-base font-semibold text-text-001">
          공유된 시험{' '}
          <span className="text-brand-blue-heavy">{data.length}</span>
        </p>

        <TestCards tests={data} />
      </Container>
    );
  } else return <div>Error</div>;
};

export default TestArea;
