import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Reorder } from 'framer-motion';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import PlusIcon from '@/static/icons/plus-icon';
import { useQuery } from '@tanstack/react-query';
import { IQuestionInWorkbook } from '@/model/i-question';
import QuestionCardsDetail from '@/components/question-cards-detail';
import Loading from '@/components/ui/loading';

import { readRegisteredQuestion } from '@/api/registered-question-api';

const WorkbookQuestionArea = () => {
  const [questions, setQuestions] = useState<IQuestionInWorkbook[]>([]);

  const optimisticDeleteQuestionById = (id: string) => {
    setQuestions((prev) => prev.filter((ques) => ques.questionId !== id));
  };

  const { workbookId } = useParams<{ workbookId: string }>();

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['questionInWorkbook'],
    queryFn: () => readRegisteredQuestion(workbookId),
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (!isSuccess) return;
    setQuestions(data);
  }, [data]);

  if (isFetching) return <Loading />;
  else if (isError) return <div>Question Data fetch Error</div>;
  return (
    <Container className="flex flex-col">
      <section className="flex-grow">
        <Reorder.Group
          axis="y"
          onReorder={setQuestions}
          values={questions}
          layoutScroll
        >
          <QuestionCardsDetail
            questions={questions}
            optimisticDeleteQuestionById={optimisticDeleteQuestionById}
          />
        </Reorder.Group>
      </section>

      <div className="sticky bottom-4 my-4 w-full bg-transparent px-4">
        <BarButton
          icon={PlusIcon}
          barButtonType="link"
          href={`/register-question/${workbookId}`}
        >
          문제 등록
        </BarButton>
      </div>
    </Container>
  );
};

export default WorkbookQuestionArea;
