'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';

export type ITest = {
  workbookId: string;
  examId: string;
  creator: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'NOT_STARTED' | 'COMPLETED' | 'IN_PROGRESS';
  role: 'CREATOR' | 'EXAMINEE';
  capacity: number | null;
  examineeCount: number | null;
  totalCorrect: number | null;
  questionQuantity: number | null;
};

export const TestCard = ({ test }: { test: ITest }) => {
  const startDate = dayjs(test.startTime).format('YY.MM.DD');
  const endDate = dayjs(test.endTime).format('YY.MM.DD');

  const stateString = () => {
    switch (test.status) {
      case 'NOT_STARTED':
        return '🔴';
      case 'IN_PROGRESS':
        return '🟢';
      case 'COMPLETED':
        return '🔵';
    }
  };

  return (
    <Link
      href={test.role === 'CREATOR' ? `/test-detail/${test.examId}` : '#'}
      className="w-full"
    >
      <div
        className="relative flex h-full w-full flex-col rounded-2xl border-[1px] border-[#ecflfa] bg-white p-3"
        style={{ boxShadow: '0px 11px 15px 0px #0000000A' }}
      >
        <div className="flex flex-grow flex-col gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fafafa]">
            <span className="text-2xl">{stateString()}</span>
          </div>
          <p className="line-clamp-1 text-base font-semibold text-text-001">
            {test.title}{' '}
            <span
              className={cn(
                'text-sm font-normal text-[#AAA]',
                test.role === 'EXAMINEE' && 'text-brand-blue-heavy',
              )}
            >
              {test.role === 'CREATOR' ? '내 문제집' : 'by ' + test.creator}
            </span>
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row gap-2">
          {test.role === 'EXAMINEE' ? (
            <>
              <PropertyChunk label="문제수" value={test.questionQuantity!} />
              <Separator className="" orientation="vertical" />
              <PropertyChunk label="정답수" value={test.totalCorrect!} />
            </>
          ) : (
            <>
              <PropertyChunk label="수용 인원" value={test.capacity!} />
              <Separator className="" orientation="vertical" />
              <PropertyChunk label="응시 인원" value={test.examineeCount!} />
            </>
          )}
          <Separator className="" orientation="vertical" />
          <PropertyChunk label="시작일" value={startDate} />
          <Separator className="" orientation="vertical" />
          <PropertyChunk label="마감일" value={endDate} />
        </div>
      </div>
    </Link>
  );
};

const PropertyChunk = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div>
      <p className="text-[0.625rem] font-normal text-[#9b9b9b]">{label}</p>
      <p className="text-xs font-medium text-[#65656e]">{value}</p>
    </div>
  );
};

const TestCards = ({ tests }: { tests: ITest[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {tests.map((test) => (
        <TestCard test={test} key={test.examId} />
      ))}
    </div>
  );
};

export default TestCards;
