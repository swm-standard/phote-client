import authFetch from '@/util/auth-fetch';
import { IWorkbookBase } from '@/model/i-workbook';

export async function readWorkbookById(workbookId: string) {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'GET',
      },
    );

    return jsonRaw.data;
  } catch (e) {
    console.error(`readWorkbookById failed by ${e}`);
  }
}

export async function readQuestionsByWorkbookId(workbookId: string) {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/questions/${workbookId}`,
      {
        method: 'GET',
      },
    );

    return jsonRaw.data;
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
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'PUT',
        body: JSON.stringify(workbookBase),
      },
    );

    return await jsonRaw;
  } catch (e) {
    console.error(`updateWorkbookDetail failed by ${e}`);
  }
}

export async function deleteWorkbook(workbookId: string) {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}`,
      {
        method: 'DELETE',
      },
    );

    return jsonRaw;
  } catch (e) {
    console.error(`deleteWorkbook failed by ${e}`);
  }
}
