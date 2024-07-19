'use client';

import SearchHeader from '@/app/main/question/search-header';
import SearchedQuestions from '@/app/main/question/searched-questions';
import React, { useEffect, useState } from 'react';
import { Question, Status } from '@/app/types';
import { BASE_URL } from '@/app/constants';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  const callSearchQuestionsAPI = async () => {
    const params = new URLSearchParams();
    if (searchParams?.tags) params.append('tags', searchParams.tags);
    if (searchParams?.keywords)
      params.append('keywords', searchParams.keywords);

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
    callSearchQuestionsAPI();
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
