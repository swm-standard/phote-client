'use client';

import Container from '@/components/container';
import WorkbookInformation from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/question-list/workbook-information';
import WorkbookQuestionArea from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/question-list/workbook-question-area';
import { useState } from 'react';
import ListIcon from '@/static/icons/list-icon';
import SquareCheckIcon from '@/static/icons/square-check-icon';
import ExamArea from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/exam-list/exam-area';

type Section = 'QuestionList' | 'ExamList';

const Page = () => {
  const [selectedSection, setSelectedSection] =
    useState<Section>('QuestionList');

  return (
    <Container className="flex flex-col">
      <section>
        <WorkbookInformation />
      </section>
      <div className="flex bg-white text-text-001">
        <button
          onClick={() => setSelectedSection('QuestionList')}
          className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 ${selectedSection === 'QuestionList' ? 'border-brand-blue-light' : 'border-brand-gray-light text-text-003'}`}
        >
          <ListIcon className="h-4 w-4" />
          문제 리스트
        </button>
        <button
          onClick={() => setSelectedSection('ExamList')}
          className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 ${selectedSection === 'ExamList' ? 'border-brand-blue-light' : 'border-brand-gray-light text-text-003'}`}
        >
          <SquareCheckIcon className="h-4 w-4" />
          채점 결과
        </button>
      </div>
      <section className="flex-grow">
        {selectedSection === 'QuestionList' && <WorkbookQuestionArea />}
        {selectedSection === 'ExamList' && <ExamArea />}
      </section>
    </Container>
  );
};

export default Page;
