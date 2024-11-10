'use client';

import React from 'react';
import Container from '@/components/container';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fixFloatPoint } from '@/lib/utils';

export const TestCard = ({
  test,
  totalQCnt,
}: {
  test: ITestCard;
  totalQCnt: number;
}) => {
  const { testId } = useParams();

  return (
    <Link href={`/exam-result-detail/${testId}/${test.memberId}`}>
      <div className="flex justify-between gap-4 border-b-[1px] border-brand-gray-heavy bg-inherit bg-white px-8 py-4">
        <span className="flex-grow-[2] basis-1">
          <WordChunk label="시험자" value={`${test.name}`} />
        </span>
        <span className="flex-grow-[1] basis-1">
          <WordChunk
            label="총 점수"
            value={`${fixFloatPoint((test.score / totalQCnt) * 100)}점`}
          />
        </span>
        <span className="flex-grow-[1] basis-1">
          <WordChunk label="걸린 시간" value={`${test.time}분`} />
        </span>
      </div>
    </Link>
  );
};

export const WordChunk = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-1 flex-col items-start justify-center">
      <p className="text-xs font-normal text-text-003">{label}</p>
      <p className="line-clamp-1 text-base font-semibold text-text-001">
        {value}
      </p>
    </div>
  );
};

export type ITestCard = {
  memberId: string;
  name: string;
  score: number;
  time: number;
};

const TestCards = ({
  tests,
  totalQCnt,
}: {
  tests: ITestCard[];
  totalQCnt: number;
}) => {
  return (
    <Container>
      {tests.map((test) => (
        <TestCard key={test.memberId} test={test} totalQCnt={totalQCnt} />
      ))}
    </Container>
  );
};

export default TestCards;
