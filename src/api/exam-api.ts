export async function readExamHistories(workbookId: string) {
  try {
    const response = await fetch(`/api/exams/${workbookId}`, {
      method: 'GET',
    });

    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readExamHistories failed by ${e}`);
  }
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
  try {
    const response = await fetch(`/api/exam/${workbookId}`, {
      method: 'POST',
      body: JSON.stringify({ time, answers }),
    });

    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`[createQuestion] failed by ${e}`);
  }
}

export type SubmitAnswer = {
  questionId: string;
  submittedAnswer: string;
};
type SubmitAnswers = SubmitAnswer[];

export async function readExamDetail(examId: string) {
  try {
    const response = await fetch(`/api/exam/${examId}`, {
      method: 'GET',
    });

    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`[createQuestion] failed by ${e}`);
  }
}
