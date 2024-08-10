import { Separator } from '@/components/ui/separator';
import TrashCanIcon from '@/static/icons/trash-can-icon';
import React from 'react';
import { IWorkbook } from '@/model/i-workbook';
import dayjs from 'dayjs';
import useDialog from '@/hook/useDialog';
import WorkbookDialog from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/workbook-dialog';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { deleteWorkbook } from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/workbook-detail-api';

const WorkbookCard = ({ workbook }: { workbook: IWorkbook }) => {
  const formattedDate = dayjs(workbook.modifiedAt).format('YY.MM.DD');
  const { isOpen, toggleOpen } = useDialog();

  const handleTrashClick: React.MouseEventHandler<HTMLDivElement> = () => {
    toggleOpen();
  };

  const { workbookId } = useParams<{ workbookId: string }>();
  const mutation = useMutation({ mutationFn: deleteWorkbook });
  const router = useRouter();

  const confirmAction = async () => {
    await mutation.mutateAsync(workbookId);
    router.replace('/workbook');
  };

  return (
    <div
      className="flex h-full w-full flex-col rounded-2xl border-[1px] border-[#ecflfa] bg-white p-3"
      style={{ boxShadow: '0px 11px 15px 0px #0000000A' }}
    >
      <div className="flex flex-grow flex-col gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fafafa]">
          <span className="text-2xl">{workbook.emoji}</span>
        </div>
        <p className="text-xl font-semibold text-text-001">{workbook.title}</p>
        <p className="text-xs font-normal text-text-003">
          {workbook.description}
        </p>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <PropertyChunk label="문제수" value={workbook.quantity} />
          <Separator className="" orientation="vertical" />
          <PropertyChunk label="수정일" value={formattedDate} />
        </div>
        <div role="button" onClick={handleTrashClick}>
          <TrashCanIcon className="h-5 w-5 text-text-002" />
        </div>
        <WorkbookDialog
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          confirmAction={confirmAction}
        >
          <p className="text-001 text-center text-lg font-bold">문제집 삭제</p>
          <p className="text-001 text-sm font-medium">
            정말 <span className="text-brand-blue-heavy">{workbook.title}</span>
            을 삭제하시겠습니까? 삭제된 문제집은 복구할 수 없습니다.
          </p>
        </WorkbookDialog>
      </div>
    </div>
  );
};

const PropertyChunk = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div>
      <p className="text-[0.625rem] font-normal text-[#9b9b9b]">{label}</p>
      <p className="text-xs font-medium text-[#65656e]">{value}</p>
    </div>
  );
};

export default WorkbookCard;
