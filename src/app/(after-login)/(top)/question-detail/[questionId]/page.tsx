'use client';

import React from 'react';
import Container from '@/components/container';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteQuestionById,
  readQuestionDetailById,
} from '@/app/(after-login)/(top)/question-detail/[questionId]/question-detail-api';
import Legend from '@/components/legend';
import Image from 'next/image';
import dummyImage from '@/static/images/dummy-image-square.jpg';
import SquareButton from '@/components/square-button';
import NumberCircle from '@/components/number-circle';
import BarButton from '@/components/bar-button';
import TrashCanIcon from '@/static/icons/trash-can-icon';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { questionId: string } }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['questionDetail'],
    queryFn: () => readQuestionDetailById(params.questionId),
  });

  const mutation = useMutation({
    mutationFn: deleteQuestionById,
  });

  const router = useRouter();
  const handleDeleteClick = async () => {
    await mutation.mutateAsync(params.questionId);
    router.back();
  };

  if (isPending) return <div>loading</div>;
  else if (isError) return <div>error</div>;
  else
    return (
      <Container className="bg-white px-6">
        <div className="flex flex-col gap-5">
          <fieldset>
            <Legend required className="mb-2">
              문제설명
            </Legend>
            <textarea
              className="w-full rounded-lg border-[1px] border-brand-gray-heavy p-2 text-sm font-normal text-text-001"
              value={data.statement}
              readOnly
            />
          </fieldset>
          <fieldset>
            <Legend className="mb-2">문제 그림</Legend>
            <div className="mx-auto h-96 w-96 overflow-hidden rounded-lg">
              <Image src={dummyImage} alt="문제" />
            </div>
          </fieldset>
          <fieldset>
            <Legend className="mb-2" required>
              문제 유형
            </Legend>
            <div className="flex gap-2">
              <SquareButton
                theme={data.category === 'MULTIPLE' ? 'lightblue' : 'lightgray'}
                className="flex-grow py-2"
              >
                객관식
              </SquareButton>
              <SquareButton
                theme={data.category === 'ESSAY' ? 'lightblue' : 'lightgray'}
                className="flex-grow py-2"
              >
                단답형
              </SquareButton>
            </div>
          </fieldset>

          <fieldset>
            <Legend required className="mb-2">
              선택지
            </Legend>
            <ul className="flex flex-col gap-4">
              {data.options.map((field: string, idx: number) => (
                <li key={idx} className="flex items-center gap-4">
                  <NumberCircle number={idx + 1} className="mb-[1px]" />
                  <section className="flex-grow">{field}</section>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset>
            <Legend required className="mb-2">
              정답
            </Legend>
            {data.answer}
          </fieldset>
          <fieldset>
            <Legend className="mb-2">태그</Legend>
            <div className="mt-2 flex gap-4">
              {data.tags.map((tag: { name: string }, idx: number) => (
                <span key={idx}>{tag.name}</span>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <Legend className="mb-2">메모</Legend>
            <textarea
              className="w-full rounded-lg border-[1px] border-brand-gray-heavy p-2 text-sm font-normal text-text-001"
              value={data.memo}
              readOnly
            />
          </fieldset>
        </div>
        <div className="sticky bottom-0 w-full py-4">
          <BarButton
            icon={TrashCanIcon}
            barButtonType="button"
            onClick={handleDeleteClick}
          >
            문제 삭제
          </BarButton>
        </div>
      </Container>
    );
};

export default Page;
