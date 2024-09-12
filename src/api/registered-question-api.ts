import { IQuestionInWorkbook } from '@/model/i-question';

export async function readRegisteredQuestion(workbookId: string) {
  const response = await fetch(`/api/workbook/questions/${workbookId}`, {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function removeRegisteredQuestion({
  workbookId,
  questionId,
}: {
  workbookId: string;
  questionId: string;
}) {
  const response = await fetch(
    `/api/workbook/${workbookId}/question/${questionId}`,
    {
      method: 'DELETE',
    },
  );

  const jsonResponse = await response.json();
  return jsonResponse.data;
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

export const searchRegisterQuestions = async (
  workbookId: string,
  params: string,
) => {
  try {
    const response = await fetch(
      `/api/questions/workbook/${workbookId}?${params}`,
      {
        method: 'GET',
      },
    );
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`searchQuestionsToRegister failed by ${e}`);
  }
};

export async function registerQuestion({
  workbookId,
  checkedQuestions,
}: {
  workbookId: string;
  checkedQuestions: string[];
}) {
  try {
    const response = await fetch(`/api/workbook/${workbookId}`, {
      method: 'POST',
      body: JSON.stringify({ questions: checkedQuestions }),
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`registerQuestion failed by ${e}`);
  }
}
