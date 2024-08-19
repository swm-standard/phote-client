import React from 'react';
import Container from '@/components/container';

import Check3D from '@/static/images/3d-check.png';
import Image from 'next/image';
import ExamCard from '@/app/(after-login)/(top)/workbookDetail/[workbookId]/_components/exam-list/exam-card';

const Page = () => {
  return (
    <Container className="flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-12 text-text-001">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl font-bold">22년도 3월 모의고사 오답 모음</p>
          <p className="text-lg font-normal">4번째 시험</p>
        </div>
        <Image src={Check3D} width={130} height={130} alt="체크" />
        <div className="overflow-hidden rounded-xl bg-app-bg shadow-sm">
          <ExamCard
            exam={{
              examId: '1',
              totalQuantity: 5,
              totalCorrect: 4,
              time: 40,
              sequence: 1,
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
