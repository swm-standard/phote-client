'use client';

import { Workbook } from '@/app/_lib/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const WorkbookCard = ({ workbook }: { workbook: Workbook }) => {
  const { id, emoji, title, description, quantity, modifiedAt } = {
    ...workbook,
  };

  const formatDate = (d: Date) => {
    const date = new Date(d);
    const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월을 2자리로 패딩
    const day = date.getDate().toString().padStart(2, '0'); // 일을 2자리로 패딩

    return `${year}.${month}.${day}`;
  };

  const dateString = formatDate(modifiedAt);

  return (
    <Link href={`sub/workbookDetail/${id}`} className="w-[48%]">
      <div
        className="flex flex-col bg-white border-[1px] border-[#ecflfa] w-full h-full p-3 rounded-2xl"
        style={{ boxShadow: '0px 11px 15px 0px #0000000A' }}
      >
        <div className="flex flex-col flex-grow gap-2">
          <div className="w-11 h-11 bg-[#fafafa] rounded-lg flex items-center justify-center">
            <span className="text-2xl">{emoji}</span>
          </div>
          <p className="font-semibold text-base text-text-001 line-clamp-2">
            {title}
          </p>
          <p className="font-normal text-[#9b9b9b] text-xs line-clamp-2">
            {description}
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row gap-2">
          <PropertyChunk label="문제수" value={quantity} />
          <Separator className="" orientation="vertical" />
          <PropertyChunk label="수정일" value={dateString} />
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
      <p className="font-normal text-[0.625rem] text-[#9b9b9b] text-center">
        {label}
      </p>
      <p className="font-medium text-xs text-[#65656e] text-center">{value}</p>
    </div>
  );
};

const WorkbookCards = ({ workbooks }: { workbooks: Workbook[] }) => {
  return (
    <div className="pb-4 flex flex-row flex-wrap flex-grow gap-3 justify-center overflow-y-auto h-1">
      {workbooks.map((workbook) => (
        <WorkbookCard workbook={workbook} key={workbook.id} />
      ))}
    </div>
  );
};

export default WorkbookCards;
