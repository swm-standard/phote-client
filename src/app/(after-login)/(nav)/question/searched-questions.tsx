import { Question, Status } from '@/app/_lib/types';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/app/_lib/constants';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import QuestionIcon from '@/static/icons/question-icon';
import QuestionCards from '@/components/question-cards';

const SearchedQuestions = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [searchedQuestions, setSearchedQuestions] = useState<Question[]>([]);
  const searchParams = useSearchParams();

  const callSearchQuestionsAPI = async () => {
    const params = new URLSearchParams();
    searchParams.get('tags') &&
      params.append('tags', searchParams.get('tags') ?? '');
    searchParams.get('keywords') &&
      params.append('keywords', searchParams.get('keywords') ?? '');

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
    <Container className="flex flex-col">
      <section className="flex-grow">
        <QuestionCards questions={searchedQuestions} />
      </section>
      <div className="sticky bottom-0 w-full px-4 py-4">
        <BarButton
          Icon={QuestionIcon}
          text="문제 생성"
          href={'/createQuestion'}
        />
      </div>
    </Container>
  );
};

export default SearchedQuestions;
