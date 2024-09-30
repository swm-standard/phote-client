'use client';

import React from 'react';
import { readWorkbookDetail, receiveWorkbook } from '@/api/workbook-api';
import Loading from '@/components/ui/loading';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IWorkbook } from '@/model/i-workbook';
import { useRouter } from 'next/navigation';
import Dialog from '@/components/dialog';
import useDialog from '@/hook/useDialog';

const Page = ({ params }: { params: { workbookId: string } }) => {
  const readQuery = useQuery<IWorkbook>({
    queryKey: ['workbook-detail'],
    queryFn: () => readWorkbookDetail(params.workbookId),
  });
  const { isOpen, toggleOpen } = useDialog(true);

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
      <Dialog
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        confirmAction={handelShareClick}
      >
        <div className="text-center">
          <span className="text-brand-blue-heavy">{readQuery.data.title}</span>
          을 문제집을 공유받겠습니까
        </div>
      </Dialog>
    )
  );
};

export default Page;
