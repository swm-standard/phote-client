'use client';

import { useEffect, useState } from 'react';
import { Workbook, Status } from '@/app/_lib/types';
import { BASE_URL } from '@/app/_lib/constants';

import WorkbookCards from '@/app/(nav)/workbook/_components/workbook-cards';

const WorkbookArea = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [workbooks, setWorkbooks] = useState<Workbook[] | []>([]);

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
      <div>
        Area for workbook
        <WorkbookCards workbooks={workbooks} />
      </div>
    );
};

export default WorkbookArea;
