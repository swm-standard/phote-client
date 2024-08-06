import { IWorkbookBase } from '@/model/i-workbook';
import { IQuestion } from '@/model/i-question';

const session = localStorage.getItem('accessToken');

export async function readWorkbookById(workbookId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`readWorkbookById failed by ${e}`);
  }
}

export async function readQuestionsByWorkbookId(workbookId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/questions/${workbookId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`readQuestionsByWorkbookId failed by ${e}`);
  }
}

export async function updateWorkbookDetail({
  workbookBase,
  workbookId,
}: {
  workbookBase: IWorkbookBase;
  workbookId: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(workbookBase),
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`updateWorkbookDetail failed by ${e}`);
  }
}

export async function deleteWorkbook(workbookId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`deleteWorkbook failed by ${e}`);
  }
}

export async function updateQuestionSequence({
  workbookId,
  questions,
}: {
  workbookId: string;
  questions: IQuestion[];
}) {
  const request = questions.map((ques, idx) => {
    return {
      id: ques.questionId,
      sequence: idx + 1,
    };
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/question-sequence/${workbookId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(request),
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`updateQuestionSequence failed by ${e}`);
  }
}
