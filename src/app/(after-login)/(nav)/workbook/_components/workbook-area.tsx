'use client';

import { usePathname } from 'next/navigation';

import BarButton from '@/components/bar-button';
import Container from '@/components/container';
import NeedToCreateIcon from '@/static/icons/need-to-create-icon';
import workbookIcon from '@/static/icons/workbook-icon';
import WorkbookCards from '@/app/(after-login)/(nav)/workbook/_components/workbook-cards';
import { useQuery } from '@tanstack/react-query';
import { readWorkbooks } from '@/app/(after-login)/(nav)/workbook/workbook-api';
import { useState } from 'react';
import WorkbookDetailDrawer from '@/components/workbook-detail-drawer';

const WorkbookArea = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const { data, isError, isPending } = useQuery({
    queryKey: ['workbooks'],
    queryFn: readWorkbooks,
  });
  const pathname = usePathname();

  if (isPending) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>Error</div>;
  }
  return (
    <Container className="flex flex-col">
      <p className="sticky -top-1 bg-app-bg py-4 text-base font-semibold text-text-001">
        생성한 문제집{' '}
        <span className="text-brand-blue-heavy">{data.length}</span>
      </p>

      <section className="flex flex-grow flex-col">
        {data.length !== 0 ? (
          <WorkbookCards workbooks={data} />
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-4 text-[#e0edfb]">
            <NeedToCreateIcon className="h-12 w-12" />
            <div className="text-center">
              <p className="text-xl font-bold">문제집을</p>
              <p className="text-xl font-bold">생성해주세요</p>
            </div>
          </div>
        )}
      </section>
      <div className="sticky bottom-4 my-4 w-full">
        <BarButton icon={workbookIcon} onClick={toggleOpen}>
          문제집 생성
        </BarButton>
      </div>
      <WorkbookDetailDrawer
        drawerType="create"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </Container>
  );
};

export default WorkbookArea;
