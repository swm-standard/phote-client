'use client';

import React from 'react';
import Container from '@/components/container';

import Check3D from '@/static/images/3d-check.png';
import Image from 'next/image';
import ExamCard from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/exam-list/exam-card';
import { useQuery } from '@tanstack/react-query';
import { readExamDetail } from '@/app/(after-login)/(top)/exam-detail/[examId]/exam-detail-api';

const Page = ({ params }: { params: { examId: string } }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['exam-detail'],
    queryFn: () => readExamDetail(params.examId),
  });

  if (isPending) return <div>pending</div>;
  else if (isError) return <div>error</div>;
  return (
    <Container className="flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-12 text-text-001">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl font-bold">랜던 디펜스</p>
          <p className="text-lg font-normal">1번째 시험</p>
        </div>
        <Image src={Check3D} width={130} height={130} alt="체크" />
        <div className="overflow-hidden rounded-xl bg-app-bg shadow-sm">
          <ExamCard
            exam={{
              examId: '1',
              totalQuantity: 4,
              totalCorrect: 2,
              time: 1,
              sequence: 1,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
