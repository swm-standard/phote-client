import QuestionCard from '@/app/sub/workbookDetail/[workbookId]/question-card';
import { useEffect, useState } from 'react';
import { QuestionInWorkbook, Status } from '@/app/types';
import { readQuestionInWorkbook } from '@/app/endpoint';
import { useParams } from 'next/navigation';

const WorkbookQuestions = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [questions, setQuestions] = useState<QuestionInWorkbook[]>([]);
  const params = useParams<{ workbookId: string }>();

  useEffect(() => {
    fetch(readQuestionInWorkbook(params.workbookId))
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
      {questions.map((ques) => (
        <QuestionCard key={ques.id} question={ques} />
      ))}
    </div>
  );
};

export default WorkbookQuestions;
