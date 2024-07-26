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
      <Container className="flex flex-col relative">
        <p className="text-text-001 text-base font-semibold sticky -top-1 bg-app-bg py-4">
          생성한 문제집{' '}
          <span className="text-brand-blue-heavy">{workbooks.length}</span>
        </p>

        <section className="flex flex-col flex-grow justify-between">
          {workbooks.length !== 0 ? (
            <WorkbookCards workbooks={workbooks} />
          ) : (
            <div className="text-[#e0edfb] flex justify-center items-center flex-grow flex-col gap-4">
              <NeedToCreateIcon className="w-12 h-12" />
              <div className="text-center">
                <p className="font-bold text-xl">문제집을</p>
                <p className="font-bold text-xl">생성해주세요</p>
              </div>
            </div>
          )}
          <div className="w-full my-4 sticky bottom-4">
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
