'use client';

import { useEffect, useState } from 'react';
import { readWorkbooksUrl } from '@/app/endpoint';
import { Workbook, Status } from '@/app/types';

import WorkbookCards from '@/app/main/workbook/workbook-cards';

const WorkbookArea = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [workbooks, setWorkbooks] = useState<Workbook[] | []>([]);

  useEffect(() => {
    fetch(readWorkbooksUrl)
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
