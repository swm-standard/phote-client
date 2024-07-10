'use client';

import { workbookPage } from './workbook.css';
import WorkbookArea from '@/app/main/workbook/workbook-area';

const Page = () => {
  return (
    <div className={workbookPage}>
      <h1>문제집 관리</h1>
      <WorkbookArea />
    </div>
  );
};

export default Page;
