'use client';

import SearchHeader from '@/components/search-header';
import React from 'react';
import Container from '@/components/container';
import SearchedQuestions from '@/app/(nav)/question/searched-questions';

const Page = () => {
  return (
    <Container className="flex flex-col overflow-y-auto">
      <section className="px-4 pt-6">
        <p className="text-2xl font-bold text-text-001">문제 검색하기</p>
        <p className="mt-1 text-base font-normal text-text-002">
          # 을 통해 태그 검색도 가능해요 😃
        </p>
      </section>
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
