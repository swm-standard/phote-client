import { Question } from '@/app/types';
import QuestionCards from '@/components/question-card';

const SearchedQuestions = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      <QuestionCards questions={questions} />
    </div>
  );
};

export default SearchedQuestions;
