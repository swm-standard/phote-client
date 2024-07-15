'use client';

import { useParams } from 'next/navigation';
import Header from '@/app/sub/workbookDetail/[workbookId]/header';
import WorkbookInformation from '@/app/sub/workbookDetail/[workbookId]/workbook-information';
import WorkbookEditButtons from '@/app/sub/workbookDetail/[workbookId]/workbook-edit-buttons';
import WorkbookQuestions from '@/app/sub/workbookDetail/[workbookId]/workbook-questions';

const Page = () => {
  const params = useParams<{ workbookId: string }>();

  return (
    <div>
      <Header />
      <WorkbookInformation />
      <WorkbookEditButtons />
      <WorkbookQuestions />
    </div>
  );
};

export default Page;
