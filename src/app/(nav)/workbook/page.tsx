'use client';

import WorkbookArea from '@/app/(nav)/workbook/_components/workbook-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CreateWorkbookDrawer from '@/app/(nav)/workbook/_components/create-workbook-drawer';

const Page = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full bg-white">
      <h1>문제집 관리</h1>
      <WorkbookArea />
      <CreateWorkbookDrawer />
      <Link href={`${pathname}/intercepted/createWorkbook`}>문제집 생성</Link>
    </div>
  );
};

export default Page;
