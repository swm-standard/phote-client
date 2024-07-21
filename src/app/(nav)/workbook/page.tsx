'use client';

import WorkbookArea from '@/app/(nav)/workbook/_components/workbook-area';
import CreateWorkbookDrawer from '@/app/(nav)/workbook/_components/create-workbook-drawer';

const Page = () => {
  return (
    <div className="w-full h-full bg-white">
      <h1>문제집 관리</h1>
      <WorkbookArea />
      {/*<DrawerDemo />*/}
      <CreateWorkbookDrawer />
    </div>
  );
};

export default Page;
