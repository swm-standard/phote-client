'use client';

import React, { Suspense } from 'react';
import SearchHeader from '../../../../components/search-header';
import Container from '../../../../components/container';
import SearchedQuestions from './_components/searched-questions';

const Page = () => {
  return (
    <Suspense fallback={null}>
      <Container className="flex flex-col overflow-y-auto">
        <section className="px-4 pt-6">
          <p className="text-2xl font-bold text-text-001">문제 검색하기</p>
          <p className="mt-1 text-base font-normal text-text-002">
            # 을 통해 태그 검색도 가능해요 😃
          </p>
        </section>
        <section className="sticky top-[-1px] z-10 bg-app-bg px-4 py-5">
          <SearchHeader />
        </section>
        <section className="flex-grow">
          <SearchedQuestions />
        </section>
      </Container>
    </Suspense>
  );
};

export default Page;
