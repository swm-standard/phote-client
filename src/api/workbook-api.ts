import { IWorkbookBase } from '@/model/i-workbook';

export async function readWorkbookList() {
  try {
    const response = await fetch('/api/workbooks', {
      method: 'GET',
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`readWorkbooks failed by ${e}`);
  }
}

export async function createWorkbook(workbookBase: IWorkbookBase) {
  try {
    const response = await fetch('/api/workbook', {
      method: 'POST',
      body: JSON.stringify(workbookBase),
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.error(`createWorkbook failed by ${e}`);
  }
}

export async function readWorkbookDetail(workbookId: string) {
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
