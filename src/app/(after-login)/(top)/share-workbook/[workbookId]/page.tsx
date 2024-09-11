'use client';

import React from 'react';
import { readWorkbookDetail, receiveWorkbook } from '@/api/workbook-api';
import Loading from '@/components/ui/loading';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IWorkbook } from '@/model/i-workbook';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { workbookId: string } }) => {
  const readQuery = useQuery<IWorkbook>({
    queryKey: ['workbook-detail'],
    queryFn: () => readWorkbookDetail(params.workbookId),
  });

  const postMutation = useMutation({
    mutationFn: () => receiveWorkbook(params.workbookId),
  });

  const router = useRouter();

  const handelShareClick = async () => {
    await postMutation.mutateAsync();
    router.replace('/workbook');
  };

  if (readQuery.isFetching && postMutation.isPending) return <Loading />;
  else if (readQuery.isError) {
    return <div>error</div>;
  }
  return (
    readQuery.data && (
      <div className="flex flex-col">
        {readQuery.data.title} 문제집을 공유 받으시겠습니까?
        <button onClick={handelShareClick}>공유받기</button>
      </div>
    )
  );
};

export default Page;
