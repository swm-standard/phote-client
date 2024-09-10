import { IQuestionInWorkbook } from '@/model/i-question';

export async function readRegisteredQuestion(workbookId: string) {
  try {
    const response = await fetch(`/api/workbook/questions/${workbookId}`, {
      method: 'GET',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readQuestionsByWorkbookId failed by ${e}`);
  }
}

export async function removeRegisteredQuestion({
  workbookId,
  questionId,
}: {
  workbookId: string;
  questionId: string;
}) {
  try {
    const response = await fetch(
      `/api/workbook/${workbookId}/question/${questionId}`,
      {
        method: 'DELETE',
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`deleteQuestionInWorkbook failed by ${e}`);
  }
}

export async function updateRegisteredQuestionSequence({
  workbookId,
  questions,
}: {
  workbookId: string;
  questions: IQuestionInWorkbook[];
}) {
  const request = questions.map((ques, idx) => {
    return {
      questionSetId: ques.questionSetId,
      sequence: `${idx + 1}`,
    };
  });

  try {
    const response = await fetch(
      `/api/workbook/question-sequence/${workbookId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(request),
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`updateQuestionSequence failed by ${e}`);
  }
}
