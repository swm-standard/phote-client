'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import QuestionIcon from '@/static/icons/question-icon';
import QuestionCards from '@/components/question-cards';
import { useQuery } from '@tanstack/react-query';
import { searchQuestions } from '@/app/(after-login)/(nav)/question/question-api';
import Loading from '@/components/ui/loading';

const SearchedQuestions = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  searchParams.get('tags') &&
    params.append('tags', searchParams.get('tags') ?? '');
  searchParams.get('keywords') &&
    params.append('keywords', searchParams.get('keywords') ?? '');

  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ['searchQuestions'],
    queryFn: () => searchQuestions(params.toString()),
  });

  useEffect(() => {
    (async () => refetch())();
  }, [searchParams, refetch]);

  if (isFetching) return <Loading />;
  else if (isError) return <div>error</div>;
  return (
    <Container className="flex flex-col">
      <section className="flex-grow">
        <QuestionCards questions={data} />
      </section>
      <div className="sticky bottom-0 w-full bg-transparent px-4 py-4">
        <BarButton
          icon={QuestionIcon}
          barButtonType="link"
          href={'/createQuestion'}
        >
          문제 생성
        </BarButton>
      </div>
    </Container>
  );
};

export default SearchedQuestions;
