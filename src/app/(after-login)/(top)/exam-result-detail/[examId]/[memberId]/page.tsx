'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  IStudentResultDetailResponse,
  Ques,
  readStudentResultDetail,
} from '@/api/exam-api';
import Loading from '@/components/ui/loading';
import Container from '@/components/container';
import AngleDownIcon from '@/static/icons/angle-down-icon';
import Image from 'next/image';
import NumberCircle from '@/components/number-circle';
import { Separator } from '@/components/ui/separator';
import AngleRightIcon from '@/static/icons/angle-right-icon';

const Page = () => {
  const { examId, memberId } = useParams<{
    examId: string;
    memberId: string;
  }>();

  const { data, isPending, isSuccess } = useQuery<IStudentResultDetailResponse>(
    {
      queryKey: ['examResultDetail'],
      queryFn: () => readStudentResultDetail({ testId: examId, memberId }),
    },
  );

  if (isPending) return <Loading />;
  else if (isSuccess)
    return (
      <Container>
        <div className="px-10 py-6">
          <div
            className="flex h-full w-full flex-col rounded-2xl border border-[#ecfafa] bg-white p-3"
            style={{ boxShadow: '0px 11px 15px 0px #0000000A' }}
          >
            <div className="flex flex-grow flex-col gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fafafa]">
                <span className="text-2xl">😃</span>
              </div>
              <p className="font-semibold text-text-001">{data.memberName}</p>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <div className="flex flex-row gap-2">
                <PropertyChunk label="시간" value={`${data.time} 분`} />
                <Separator className="" orientation="vertical" />
                <PropertyChunk label="맞은수" value={`${data.totalCorrect}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-scroll">
          {data.questions.map((q, idx) => (
            <div key={q.sequence} role="button" className="bg-white">
              <QuestionCard q={q} />
            </div>
          ))}
        </div>
      </Container>
    );
  else return <div>error</div>;
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

const QuestionCard = ({ q }: { q: Ques }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (expanded)
    return (
      <div
        onClick={() => setExpanded(false)}
        className="border-b-[1px] border-brand-gray-heavy"
      >
        <div className="flex w-full items-center justify-between gap-2 bg-white p-4 pb-0">
          <div>
            <AngleDownIcon className="h-4 w-4 text-text-001" />
          </div>
          <div className="flex-grow">
            <div className="flex gap-1 text-xs font-bold">
              <span className="text-text-004">
                {q.category === 'ESSAY' ? '단답형' : '객관식'}
              </span>
            </div>
            <p className="text-left text-base font-normal text-text-001">
              <span className="font-bold">{q.isCorrect ? '✅' : '❌'}</span>
              <span className="font-bold">{` Q${q.sequence} `}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-10 py-4">
          <div className="flex flex-col">
            <span className="text-left text-sm font-bold text-text-001">
              [ 문제 설명 ]
            </span>
            <p className="text-left text-base font-normal text-text-001">
              {q.statement}
            </p>
          </div>
          {q.image && (
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg">
              <Image src={q.image} alt="문제" fill />
            </div>
          )}
          {q.options.length ? (
            <div className="flex flex-col gap-1">
              <span className="text-left text-sm font-bold text-text-001">
                [ 선택지 ]
              </span>
              <ul className="flex flex-col gap-1">
                {q.options.map((option, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-left">
                    <NumberCircle
                      number={idx + 1}
                      isBlue={idx + 1 === Number(q.answer)}
                    />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  else
    return (
      <div
        onClick={() => setExpanded(true)}
        className="border-b-[1px] border-brand-gray-heavy"
      >
        <div className="flex w-full items-center justify-between gap-2 bg-white p-4">
          <div>
            <AngleRightIcon className="h-4 w-4 text-text-001" />
          </div>
          <div className="flex-grow">
            <div className="flex gap-1 text-xs font-bold">
              <span className="text-text-004">
                {q.category === 'ESSAY' ? '단답형' : '객관식'}
              </span>
            </div>
            <p
              className={`line-clamp-1 text-left text-base font-normal text-text-001`}
            >
              <span className="font-bold">{q.isCorrect ? '✅' : '❌'}</span>
              <span className="font-bold">{` Q${q.sequence} `}</span>
              {q.statement}
            </p>
          </div>
        </div>
      </div>
    );
};

export default Page;
