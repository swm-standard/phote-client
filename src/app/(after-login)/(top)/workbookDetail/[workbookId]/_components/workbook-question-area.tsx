import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Reorder } from 'framer-motion';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import PlusIcon from '@/static/icons/plus-icon';
import { useQuery } from '@tanstack/react-query';
import { readQuestionsByWorkbookId } from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/workbook-detail-api';
import { IQuestion } from '@/model/i-question';
import QuestionCardsDetail from '@/components/question-cards-detail';

const WorkbookQuestionArea = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const { workbookId } = useParams<{ workbookId: string }>();

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['questionInWorkbook'],
    queryFn: () => readQuestionsByWorkbookId(workbookId),
  });

  useEffect(() => {
    if (!isSuccess) return;
    setQuestions(data);
  }, [isSuccess]);

  if (isPending) return <div>loading..</div>;
  else if (isError) return <div>Question Data fetch Error</div>;
  return (
    <Container className="flex flex-col bg-white">
      <section className="flex-grow">
        <Reorder.Group
          axis="y"
          onReorder={setQuestions}
          values={questions}
          layoutScroll
        >
          <QuestionCardsDetail questions={questions} />
        </Reorder.Group>
      </section>

      <div className="sticky bottom-4 my-4 w-full px-4">
        <BarButton
          icon={PlusIcon}
          barButtonType="link"
          href={'/register-question'}
        >
          문제 등록
        </BarButton>
      </div>
    </Container>
  );
};

export default WorkbookQuestionArea;
