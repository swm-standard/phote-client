'use client';

import Container from '@/components/container';
import TestInformation from '@/app/(after-login)/(top)/test-detail/[testId]/_components/test-information';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { readAllSharedExams } from '@/api/exam-api';
import Loading from '@/components/ui/loading';
import TestCreatorSection from '@/app/(after-login)/(top)/test-detail/[testId]/_components/test-creator/test-creator-section';
import TestExamineeSection from '@/app/(after-login)/(top)/test-detail/[testId]/_components/test-creator/test-examinee-section';
import { ITest } from '@/app/(after-login)/(nav)/test/_components/test-cards';

type Section = 'QuestionList' | 'ExamList';

const Page = () => {
  const { testId } = useParams<{ testId: string }>();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['sharedExamDetail'],
    queryFn: readAllSharedExams,
  });

  if (isFetching) return <Loading />;
  else if (isSuccess) {
    // @ts-expect-error TS7031: Binding element 'data' implicitly has an 'any' type.
    const filteredData = data.find((d) => d.examId === testId);
    return <Content data={filteredData} />;
  } else return <div>error</div>;
};

const Content = ({ data }: { data: ITest }) => {
  return (
    <Container className="flex flex-col">
      <section>
        <TestInformation test={data} />
      </section>
      <section className="flex-grow">
        {data.role === 'CREATOR' ? (
          <TestCreatorSection />
        ) : (
          <TestExamineeSection />
        )}
      </section>
    </Container>
  );
};

export default Page;
