'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { IWorkbook } from '@/model/i-workbook';
import dayjs from 'dayjs';

const WorkbookCard = ({ workbook }: { workbook: IWorkbook }) => {
  const formattedDate = dayjs(workbook.modifiedAt).format('YY.MM.DD');

  return (
    <Link href={`workbook-detail/${workbook.workbookId}`} className="w-full">
      <div
        className="flex h-full w-full flex-col rounded-2xl border-[1px] border-[#ecflfa] bg-white p-3"
        style={{ boxShadow: '0px 11px 15px 0px #0000000A' }}
      >
        <div className="flex flex-grow flex-col gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fafafa]">
            <span className="text-2xl">{workbook.emoji}</span>
          </div>
          <p className="line-clamp-1 text-base font-semibold text-text-001">
            {workbook.title}
          </p>
          <textarea
            disabled
            rows={2}
            className="line-clamp-2 text-xs font-normal text-[#9b9b9b]"
            value={workbook.description}
          />
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row gap-2">
          <PropertyChunk label="문제수" value={workbook.quantity} />
          <Separator className="" orientation="vertical" />
          <PropertyChunk label="수정일" value={formattedDate} />
        </div>
      </div>
    </Link>
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

const WorkbookCards = ({ workbooks }: { workbooks: IWorkbook[] }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {workbooks.map((workbook) => (
        <WorkbookCard workbook={workbook} key={workbook.workbookId} />
      ))}
    </div>
  );
};

export default WorkbookCards;
