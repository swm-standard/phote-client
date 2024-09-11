'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/container';
import QuestionCards from '@/components/question-cards';
import { useImmer } from 'use-immer';
import SquareButton from '@/components/square-button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import {
  registerQuestion,
  searchRegisterQuestions,
} from '@/api/registered-question-api';

const SearchedQuestions = () => {
  const searchParams = useSearchParams();
  const { workbookId } = useParams<{ workbookId: string }>();
  const params = new URLSearchParams();
  searchParams.get('tags') &&
    params.append('tags', searchParams.get('tags') ?? '');
  searchParams.get('keywords') &&
    params.append('keywords', searchParams.get('keywords') ?? '');

  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ['searchRegisterQuestion'],
    queryFn: () => searchRegisterQuestions(workbookId, params.toString()),
  });

  const [checkedQuestions, updateCheckedQuestions] = useImmer<string[]>([]);
  const checkQuestion = (id: string) => {
    updateCheckedQuestions((draft) => {
      draft.push(id);
    });
  };

  const uncheckQuestion = (targetId: string) => {
    updateCheckedQuestions((draft) => draft.filter((id) => id !== targetId));
  };

  useEffect(() => {
    (async () => refetch())();
  }, [searchParams, refetch]);

  const router = useRouter();
  const createMutation = useMutation({
    mutationFn: registerQuestion,
  });

  const queryClient = useQueryClient();
  const handleRegisterClick = async () => {
    await createMutation.mutateAsync({ workbookId, checkedQuestions });
    await queryClient.invalidateQueries({ queryKey: ['questionInWorkbook'] });
    await queryClient.invalidateQueries({ queryKey: ['workbookInformation'] });
    router.replace(`/workbook-detail/${workbookId}`);
  };

  if (isFetching) return <Loading />;
  else if (isError) return <div>error</div>;
  return (
    <Container className="flex flex-col">
      <section className="flex-grow">
        <QuestionCards
          questions={data}
          questionCardType="check"
          checkedQuestions={checkedQuestions}
          checkQuestion={checkQuestion}
          uncheckQuestion={uncheckQuestion}
        />
      </section>
      <div className="sticky bottom-0 flex gap-4 bg-white px-4 py-3">
        {/*<SquareButton className="px-6 py-2">신규 문제</SquareButton>*/}
        <SquareButton
          className="flex-grow py-2"
          theme="blue"
          onClick={handleRegisterClick}
        >{`${checkedQuestions.length}개의 문제 등록`}</SquareButton>
      </div>
    </Container>
  );
};

export default SearchedQuestions;
