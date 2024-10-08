export async function readExamHistories(workbookId: string) {
  const response = await fetch(`/api/exams/${workbookId}`, {
    method: 'GET',
  });

  const json = await response.json();
  return json.data;
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
