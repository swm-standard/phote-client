import { TestForm } from '@/app/(after-login)/(top)/workbook-detail/[workbookId]/_components/question-list/workbook-edit-buttons';

export async function readExamHistories(workbookId: string) {
  const response = await fetch(`/api/exams/${workbookId}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data.sort(
    (a: { sequence: number }, b: { sequence: number }) =>
      b.sequence - a.sequence,
  );
}

export async function submitExam({
  time,
  answers,
  workbookId,
}: {
  time: number;
  answers: SubmitAnswers[];
  workbookId: string;
}) {
  const response = await fetch(`/api/exam`, {
    method: 'POST',
    body: JSON.stringify({ time, answers, workbookId, examId: null }),
  });

  const json = await response.json();
  return json.data;
}

export async function submitTest({
  time,
  answers,
  examId,
}: {
  time: number;
  answers: SubmitAnswers[];
  examId: string;
}) {
  const response = await fetch(`/api/exam`, {
    method: 'POST',
    body: JSON.stringify({ time, answers, examId, workbookId: null }),
  });

  const json = await response.json();
  return json.data;
}

export type SubmitAnswer = {
  questionId: string;
  submittedAnswer: string;
};
type SubmitAnswers = SubmitAnswer[];

export async function readExamDetail(examId: string) {
  const response = await fetch(`/api/exam/${examId}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
}

export async function createTest(requestBody: TestForm) {
  const response = await fetch(`/api/exam/create`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  const json = await response.json();
  return json.data;
}

export async function readAllSharedExams() {
  const response = await fetch(`/api/exams`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
}

export async function readStudentResultOverview(testId: string) {
  const response = await fetch(`/api/exams/result/${testId}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
}

export async function readStudentResultDetail({
  testId,
  memberId,
}: {
  testId: string;
  memberId: string;
}): Promise<IStudentResultDetailResponse> {
  const response = await fetch(`/api/exam/result/${testId}/${memberId}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
}

export type IStudentResultDetailResponse = {
  memberName: string;
  totalCorrect: number;
  time: number;
  questions: Ques[];
};

export type Ques = {
  statement: string;
  options: string[];
  image: string;
  category: 'MULTIPLE' | 'ESSAY';
  answer: string;
  isCorrect: boolean;
  sequence: number;
};
