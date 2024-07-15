'use client';

import { useEffect, useState } from 'react';
import { Status, Workbook } from '@/app/types';
import { useParams, usePathname } from 'next/navigation';
import { readWorkbookByIdUrl } from '@/app/endpoint';

const WorkbookInformation = () => {
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const params = useParams<{ workbookId: string }>();
  const pathname = usePathname();

  useEffect(() => {
    fetch(readWorkbookByIdUrl(params.workbookId))
      .then((res) => res.json())
      .then((res) => {
        setWorkbook(res);
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
      });
  }, []);

  if (status === 'loading') return <div>loading..</div>;
  else if (status === 'error') return <div>workbook-information load fail</div>;
  else
    return (
      <div>
        <div className="flex flew-row">
          <div>{workbook?.emoji}</div>
          <div>문제수 : {workbook?.quantity}</div>
          <div>공유 : 0</div>
          <div>수정일 : {workbook?.modifiedAt.toString()}</div>
        </div>
        <div className="flex flew-row">
          <div>{workbook?.title}</div>
          <div>{workbook?.description}</div>
        </div>
      </div>
    );
};

export default WorkbookInformation;
