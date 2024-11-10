'use client';

import {
  ITest,
  TestCard,
} from '@/app/(after-login)/(nav)/test/_components/test-cards';
import TestEditButtons from '@/app/(after-login)/(top)/test-detail/[testId]/_components/test-edit-buttons';

const TestInformation = ({ test }: { test: ITest }) => {
  return (
    <div className="flex flex-col gap-4 px-10 py-6">
      <TestCard test={test} />
      {test.role === 'CREATOR' && (
        <TestEditButtons examId={test.examId} workbookId={test.workbookId} />
      )}
    </div>
  );
};

export default TestInformation;
