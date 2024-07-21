'use client';

import SearchHeader from '@/app/(nav)/question/search-header';
import SearchedQuestions from '@/app/(nav)/question/searched-questions';
import React, { useEffect, useState } from 'react';
import { Question, Status } from '@/app/_lib/types';
import { BASE_URL } from '@/app/_lib/constants';

const Page = ({
  searchParams,
}: {
  searchParams?: {
    tags?: string;
    keywords?: string;
  };
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [searchedQuestions, setSearchedQuestions] = useState<Question[]>([]);

  const callSearchQuestionsAPI = async () => {
    const params = new URLSearchParams();
    searchParams?.tags && params.append('tags', searchParams.tags);
    searchParams?.keywords && params.append('keywords', searchParams.keywords);

    try {
      const response = await fetch(
        `${BASE_URL}/questions?${params.toString()}`,
      );

      const data = await response.json();

      setSearchedQuestions(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    (async () => {
      await callSearchQuestionsAPI();
    })();
  }, [searchParams]);

  if (status === 'loading') return <div>loading</div>;
  else if (status === 'error') return <div>error</div>;
  return (
    <div>
      <SearchHeader searchedQuestionNumber={searchedQuestions.length} />
      <SearchedQuestions questions={searchedQuestions} />
    </div>
  );
};

export default Page;
