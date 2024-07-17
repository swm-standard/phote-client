import React, { useEffect, useState } from 'react';
import { QuestionInWorkbook, Status } from '@/app/types';
import { useParams } from 'next/navigation';
import { BASE_URL } from '@/app/constants';
import { Reorder } from 'framer-motion';
import QuestionCards from '@/app/sub/workbookDetail/[workbookId]/question-card';

const WorkbookQuestionArea = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [questions, setQuestions] = useState<QuestionInWorkbook[]>([]);
  const params = useParams<{ workbookId: string }>();

  useEffect(() => {
    fetch(`${BASE_URL}/workbook/questions/${params.workbookId}`)
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
        setStatus('success');
      })
      .catch((err) => setStatus('error'));
  }, []);

  useEffect(() => {}, [questions]);

  if (status === 'loading') return <div>loading..</div>;
  else if (status === 'error') return <div>Question Data fetch Error</div>;

  return (
    <div>
      <Reorder.Group
        axis="y"
        onReorder={setQuestions}
        values={questions}
        layoutScroll
        style={{ overflowY: 'scroll' }}
      >
        <QuestionCards questions={questions} />
      </Reorder.Group>
    </div>
  );
};

export default WorkbookQuestionArea;
