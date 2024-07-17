import QuestionCard from '@/app/sub/workbookDetail/[workbookId]/question-card';
import React, { useEffect, useState } from 'react';
import { QuestionInWorkbook, Status } from '@/app/types';
import { useParams } from 'next/navigation';
import { BASE_URL } from '@/app/constants';
import { Reorder } from 'framer-motion';

const WorkbookQuestions = () => {
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

  if (status === 'loading') return <div>loading..</div>;
  else if (status === 'error') return <div>Question Data fetch Error</div>;
  return (
    <div className="flex flex-col gap-4 p-4">
      <Reorder.Group
        axis="y"
        onReorder={setQuestions}
        values={questions}
        layoutScroll
        style={{ overflowY: 'scroll' }}
      >
        {questions.map((ques) => (
          <QuestionCard key={ques.id} question={ques} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default WorkbookQuestions;
