'use client';

import React from 'react';
import Container from '@/components/container';
import { useMutation, useQuery } from '@tanstack/react-query';
import Legend from '@/components/legend';
import Image from 'next/image';
import SquareButton from '@/components/square-button';
import NumberCircle from '@/components/number-circle';
import BarButton from '@/components/bar-button';
import TrashCanIcon from '@/static/icons/trash-can-icon';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/loading';
import { deleteQuestionById, readQuestionDetail } from '@/api/question-api';

const Page = ({ params }: { params: { questionId: string } }) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['questionDetail'],
    queryFn: () => readQuestionDetail(params.questionId),
  });

  const mutation = useMutation({
    mutationFn: deleteQuestionById,
  });

  const router = useRouter();
  const handleDeleteClick = async () => {
    await mutation.mutateAsync(params.questionId);
    router.back();
  };

  if (isFetching) return <Loading />;
  else if (isError || mutation.isError) return <div>error</div>;
  else
    return (
      <>
        {mutation.isPending ? <Loading /> : null}
        <Container className="bg-white px-6 pt-4">
          <section className="flex flex-col gap-6">
            <fieldset>
              <Legend required className="mb-2 text-sm">
                문제설명
              </Legend>
              <textarea
                rows={3}
                className="w-full rounded-lg border-[1px] border-brand-gray-heavy p-2 text-sm font-normal text-text-001"
                value={data.statement}
                readOnly
              />
            </fieldset>

            {data.image && (
              <fieldset>
                <Legend className="mb-2 text-sm">문제 그림</Legend>
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg">
                  <Image src={data.image} fill alt="문제" />
                </div>
              </fieldset>
            )}

            <fieldset>
              <Legend className="mb-2 text-sm" required>
                문제 유형
              </Legend>
              <div className="flex gap-2">
                <SquareButton
                  theme={
                    data.category === 'MULTIPLE' ? 'lightblue' : 'lightgray'
                  }
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

            {data.category === 'MULTIPLE' && (
              <fieldset>
                <Legend required className="mb-2 text-sm">
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
            )}

            <fieldset>
              <Legend required className="mb-2 text-sm">
                정답
              </Legend>
              {data.answer}
            </fieldset>
            <fieldset>
              <Legend className="mb-2 text-sm">태그</Legend>
              <div className="flex gap-4">
                {data.tags.map((tag: { name: string }, idx: number) => (
                  <span key={idx}>{tag.name}</span>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <Legend className="mb-2 text-sm">메모</Legend>
              <textarea
                className="w-full rounded-lg border-[1px] border-brand-gray-heavy p-2 text-sm font-normal text-text-001"
                value={data.memo}
                readOnly
              />
            </fieldset>
          </section>

          <div className="sticky bottom-0 w-full bg-transparent py-4">
            <BarButton
              icon={TrashCanIcon}
              barButtonType="button"
              onClick={handleDeleteClick}
            >
              문제 삭제
            </BarButton>
          </div>
        </Container>
      </>
    );
};

export default Page;
