'use client';

import { useParams } from 'next/navigation';
import WorkbookEditButtons from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-edit-buttons';
import { useQuery } from '@tanstack/react-query';
import { readWorkbookById } from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/workbook-detail-api';
import WorkbookCard from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-card';

const WorkbookInformation = () => {
  const { workbookId } = useParams<{ workbookId: string }>();
  const { data, isError, isPending } = useQuery({
    queryKey: ['workbookInformation'],
    queryFn: () => readWorkbookById(workbookId),
  });

  if (isPending) return <div>loading..</div>;
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
