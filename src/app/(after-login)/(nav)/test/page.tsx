'use client';

import Container from '@/components/container';
import TestArea from '@/app/(after-login)/(nav)/test/_components/test-area';

const Page = () => {
  return (
    <Container className="flex flex-col px-4">
      <section className="flex-grow">
        <TestArea />
      </section>
    </Container>
  );
};

export default Page;
