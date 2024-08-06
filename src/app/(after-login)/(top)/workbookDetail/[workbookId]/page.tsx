'use client';

import Container from '@/components/container';
import WorkbookInformation from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-information';
import WorkbookQuestionArea from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-question-area';

const Page = () => {
  return (
    <Container className="flex flex-col overflow-scroll">
      <section>
        <WorkbookInformation />
      </section>
      <section className="flex-grow">
        <WorkbookQuestionArea />
      </section>
    </Container>
  );
};

export default Page;
