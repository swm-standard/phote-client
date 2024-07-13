'use client';

import WorkbookArea from '@/app/main/workbook/workbook-area';
import { DrawerDemo } from '@/app/main/workbook/drawer';

const Page = () => {
  return (
    <div className="w-full h-full bg-white">
      <h1>문제집 관리</h1>
      <WorkbookArea />
      <DrawerDemo />
    </div>
  );
};

export default Page;
