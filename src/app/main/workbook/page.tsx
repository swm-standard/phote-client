'use client';

import WorkbookArea from '@/app/main/workbook/workbook-area';
import { DrawerDemo } from '@/app/main/workbook/drawer';
import DrawerRefactor from '@/app/main/workbook/drawer-refactor';

const Page = () => {
  return (
    <div className="w-full h-full bg-white">
      <h1>문제집 관리</h1>
      <WorkbookArea />
      {/*<DrawerDemo />*/}
      <DrawerRefactor />
    </div>
  );
};

export default Page;
