'use client';

import { useEffect, useState } from 'react';
import { Workbook, Status } from '@/app/_lib/types';
import { BASE_URL } from '@/app/_lib/constants';
import { usePathname } from 'next/navigation';

import WorkbookCards from '@/app/(nav)/workbook/_components/workbook-cards';
import BarButton from '@/components/bar-button';

const WorkbookArea = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [workbooks, setWorkbooks] = useState<Workbook[] | []>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${BASE_URL}/workbooks`)
      .then((res) => res.json())
      .then((res) => {
        setWorkbooks(res);
        setStatus('success');
      })
      .catch((err) => setStatus('error'));
  }, []);

  if (status === 'loading') return <div>loading..</div>;
  else if (status === 'error') return <div>error</div>;
  else
    return (
      <div className="flex flex-col flex-grow ">
        <p className="text-text-001 text-base font-semibold sticky -top-1 bg-app-bg py-4">
          생성한 문제집{' '}
          <span className="text-brand-blue-heavy">{workbooks.length}</span>
        </p>
        <div>
          <WorkbookCards workbooks={workbooks} />
          <div className="w-full my-4 sticky bottom-4">
            <BarButton
              text="문제집 생성"
              href={`${pathname}/intercepted/createWorkbook`}
            />
          </div>
        </div>
      </div>
    );
};

export default WorkbookArea;
