type SubmitAnswers = SubmitAnswer[];
type SubmitAnswer = {
  questionId: string;
  submittedAnswer: string;
};

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
