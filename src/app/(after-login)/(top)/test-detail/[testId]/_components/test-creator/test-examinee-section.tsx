import React from 'react';
import Container from '@/components/container';
import BarButton from '@/components/bar-button';
import PlusIcon from '@/static/icons/plus-icon';
import CheckCircleIcon from '@/static/icons/check-circle-icon';

const TestExamineeSection = () => {
  return (
    <Container className="flex flex-col">
      <section className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center text-lg text-brand-blue-light">
          <CheckCircleIcon className="mb-2 h-6 w-6" />
          <p>시험 기록이 없습니다!</p>
          <p>풀이 후 결과를 확인하세요</p>
        </div>
      </section>
      <div className="sticky bottom-4 my-4 w-full px-4">
        <BarButton icon={PlusIcon} barButtonType="link" href={`/}`}>
          시험 보기
        </BarButton>
      </div>
    </Container>
  );
};

export default TestExamineeSection;
