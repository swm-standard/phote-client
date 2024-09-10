'use client';

import { useParams } from 'next/navigation';
import WorkbookEditButtons from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/question-list/workbook-edit-buttons';
import { useQuery } from '@tanstack/react-query';
import WorkbookCard from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/question-list/workbook-card';
import Loading from '@/components/ui/loading';
import { readWorkbookDetail } from '@/api/workbook-api';

const WorkbookInformation = () => {
  const { workbookId } = useParams<{ workbookId: string }>();
  const { data, isError, isFetching } = useQuery({
    queryKey: ['workbookInformation'],
    queryFn: () => readWorkbookDetail(workbookId),
  });

  if (isFetching) return <Loading />;
  else if (isError) return <div>workbook-information load fail</div>;
  else
    return (
      <div className="flex flex-col gap-4 px-10 py-6">
        <WorkbookCard workbook={data} />
        <WorkbookEditButtons
          workbookBase={{ title: data.title, description: data.description }}
        />
      </div>
    );
};

export default WorkbookInformation;
