import { IWorkbookBase } from '@/model/i-workbook';

export async function readWorkbookById(workbookId: string) {
  try {
    const response = await fetch(`/api/workbook/${workbookId}`, {
      method: 'GET',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readWorkbookById failed by ${e}`);
  }
}

export async function readQuestionsByWorkbookId(workbookId: string) {
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

export async function updateWorkbookDetail({
  workbookBase,
  workbookId,
}: {
  workbookBase: IWorkbookBase;
  workbookId: string;
}) {
  try {
    const response = await fetch(`/api/workbook/${workbookId}`, {
      method: 'PUT',
      body: JSON.stringify(workbookBase),
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`updateWorkbookDetail failed by ${e}`);
  }
}

export async function deleteWorkbook(workbookId: string) {
  try {
    const response = await fetch(`/api/workbook/${workbookId}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`deleteWorkbook failed by ${e}`);
  }
}
