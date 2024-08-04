import { Question, Status } from '@/app/_lib/types';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/app/_lib/constants';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/container';
import QuestionCards from '@/components/question-cards';
import { useImmer } from 'use-immer';
import SquareButton from '@/components/square-button';

const SearchedQuestions = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [searchedQuestions, setSearchedQuestions] = useState<Question[]>([]);
  const searchParams = useSearchParams();

  const [checkedQuestions, updateCheckedQuestions] = useImmer<string[]>([]);
  const checkQuestion = (id: string) => {
    updateCheckedQuestions((draft) => {
      draft.push(id);
    });
  };

  const uncheckQuestion = (targetId: string) => {
    updateCheckedQuestions((draft) => draft.filter((id) => id !== targetId));
  };

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
        <QuestionCards
          questions={searchedQuestions}
          questionCardType="check"
          checkedQuestions={checkedQuestions}
          checkQuestion={checkQuestion}
          uncheckQuestion={uncheckQuestion}
        />
      </section>
      <div className="sticky bottom-0 flex gap-4 bg-white px-4 py-3">
        <SquareButton buttonText="신규 문제" className="px-6" />
        <SquareButton
          className="flex-grow"
          buttonText={`${checkedQuestions.length}개의 문제 등록`}
          variant="blue"
        />
      </div>
    </Container>
  );
};

export default SearchedQuestions;
