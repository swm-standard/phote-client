'use client';

import Container from '@/components/container';
import Banner from "@/app/(after-login)/(nav)/workbook/_components/banner";
import WorkbookArea from "@/app/(after-login)/(nav)/workbook/_components/workbook-area";

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
