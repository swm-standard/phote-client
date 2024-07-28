'use client';

import { useEffect, useState } from 'react';
import { Workbook, Status } from '@/app/_lib/types';
import { BASE_URL } from '@/app/_lib/constants';
import { usePathname } from 'next/navigation';

import WorkbookCards from '@/app/(nav)/workbook/_components/workbook-cards';
import BarButton from '@/components/bar-button';
import Container from '@/components/container';
import NeedToCreateIcon from '@/static/icons/need-to-create-icon';

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
      <Container className="relative flex flex-col">
        <p className="sticky -top-1 bg-app-bg py-4 text-base font-semibold text-text-001">
          생성한 문제집{' '}
          <span className="text-brand-blue-heavy">{workbooks.length}</span>
        </p>

        <section className="flex flex-grow flex-col justify-between">
          {workbooks.length !== 0 ? (
            <WorkbookCards workbooks={workbooks} />
          ) : (
            <div className="flex flex-grow flex-col items-center justify-center gap-4 text-[#e0edfb]">
              <NeedToCreateIcon className="h-12 w-12" />
              <div className="text-center">
                <p className="text-xl font-bold">문제집을</p>
                <p className="text-xl font-bold">생성해주세요</p>
              </div>
            </div>
          )}
          <div className="sticky bottom-4 my-4 w-full">
            <BarButton
              text="문제집 생성"
              href={`${pathname}/intercepted/createWorkbook`}
            />
          </div>
        </section>
      </Container>
    );
};

export default WorkbookArea;
