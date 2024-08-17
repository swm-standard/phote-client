'use client';

import SearchHeader from '@/components/search-header';
import React from 'react';
import Container from '@/components/container';
import SearchedQuestions from '@/app/(after-login)/(top)/register-question/[workbookId]/searched-questions';

const Page = () => {
  return (
    <Container className="flex flex-col">
      <section className="sticky top-[-1px] bg-app-bg px-4 py-5">
        <SearchHeader />
      </section>
      <section className="flex-grow">
        <SearchedQuestions />
      </section>
    </Container>
  );
};

export default Page;
