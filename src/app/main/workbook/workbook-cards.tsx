'use client';

import { Workbook } from '@/app/types';
import Link from 'next/link';
import { SUB_ROUTES } from '@/app/routing';

const WorkbookCard = ({ workbook }: { workbook: Workbook }) => {
  return (
    <Link href={SUB_ROUTES.workbookDetail(workbook.id)} passHref>
      <div className="w-4/5 p-1 border-black border-[1px]">
        <div>{workbook.emoji}</div>
        <div>{workbook.title}</div>
        <div>{workbook.description}</div>
        <div>{workbook.quantity}</div>
        <div suppressHydrationWarning>{workbook.modifiedAt.toString()}</div>
      </div>
    </Link>
  );
};

const WorkbookCards = ({ workbooks }: { workbooks: Workbook[] }) => {
  return (
    <div>
      {workbooks.map((workbook) => (
        <WorkbookCard workbook={workbook} key={workbook.id} />
      ))}
    </div>
  );
};

export default WorkbookCards;