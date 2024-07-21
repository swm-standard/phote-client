'use client';

import { useParams } from 'next/navigation';
import Header from '@/app/(top)/workbookDetail/[workbookId]/header';
import WorkbookInformation from '@/app/(top)/workbookDetail/[workbookId]/workbook-information';
import WorkbookEditButtons from '@/app/(top)/workbookDetail/[workbookId]/workbook-edit-buttons';
import WorkbookQuestionArea from '@/app/(top)/workbookDetail/[workbookId]/workbook-question-area';

const Page = () => {
  const params = useParams<{ workbookId: string }>();

  return (
    <div>
      <Header />
      <WorkbookInformation />
      <WorkbookEditButtons />
      <WorkbookQuestionArea />
    </div>
  );
};

export default Page;
