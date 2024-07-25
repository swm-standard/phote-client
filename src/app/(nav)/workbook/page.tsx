'use client';

import WorkbookArea from '@/app/(nav)/workbook/_components/workbook-area';
import Container from '@/components/container';
import Banner from '@/app/(nav)/workbook/_components/banner';

const Page = () => {
  return (
    <div className="w-full px-4 pb-0 flex flex-col flex-grow overflow-scroll">
      <Banner />
      <WorkbookArea />
    </div>
  );
};

export default Page;
