'use client';

import WorkbookArea from '@/app/(nav)/workbook/_components/workbook-area';
import Container from '@/components/container';
import Banner from '@/app/(nav)/workbook/_components/banner';

const Page = () => {
  return (
    <Container className="flex flex-col overflow-scroll px-4">
      <section>
        <Banner />
      </section>
      <section className="flex-grow">
        <WorkbookArea />
      </section>
    </Container>
  );
};

export default Page;
