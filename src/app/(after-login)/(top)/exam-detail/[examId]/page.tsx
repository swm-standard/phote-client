'use client';

import React from 'react';
import Container from '@/components/container';

import Check3D from '@/static/images/3d-check.png';
import Image from 'next/image';
import { WordChunk } from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/exam-list/exam-cards';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
import { readExamDetail } from '@/api/exam-api';

const Page = ({ params }: { params: { examId: string } }) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['exam-detail'],
    queryFn: () => readExamDetail(params.examId),
  });

  if (isFetching) return <Loading />;
  else if (isError) return <div>error</div>;
  return (
    <Container className="flex items-center justify-center bg-white">
      <div className="flex w-full flex-col items-center justify-center gap-12 px-4 text-text-001">
        {/*<div className="flex flex-col items-center justify-center gap-2">*/}
        {/*  <p className="text-2xl font-bold">랜던 디펜스</p>*/}
        {/*  <p className="text-lg font-normal">1번째 시험</p>*/}
        {/*</div>*/}
        <Image src={Check3D} width={130} height={130} alt="체크" />
        <div className="w-full overflow-hidden rounded-xl border bg-app-bg shadow-sm">
          <div className="flex items-center justify-center gap-20 border-b-[1px] border-brand-gray-heavy bg-inherit bg-white px-4 py-4">
            <WordChunk
              label="총 점수"
              value={`${(data.totalCorrect / data.questions.length) * 100}점`}
            />
            <WordChunk label="걸린 시간" value={`${data.time}분`} />
            {/*<WordChunk label="시험" value={`${exam.sequence}번째 시험`} />*/}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
