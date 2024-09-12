import { IWorkbookBase } from '@/model/i-workbook';

export async function readWorkbookList() {
  const response = await fetch('/api/workbooks', {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function createWorkbook(workbookBase: IWorkbookBase) {
  const response = await fetch('/api/workbook', {
    method: 'POST',
    body: JSON.stringify(workbookBase),
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function readWorkbookDetail(workbookId: string) {
  const response = await fetch(`/api/workbook/${workbookId}`, {
    method: 'GET',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function updateWorkbookDetail({
  workbookBase,
  workbookId,
}: {
  workbookBase: IWorkbookBase;
  workbookId: string;
}) {
  const response = await fetch(`/api/workbook/${workbookId}`, {
    method: 'PUT',
    body: JSON.stringify(workbookBase),
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function deleteWorkbook(workbookId: string) {
  const response = await fetch(`/api/workbook/${workbookId}`, {
    method: 'DELETE',
  });
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function receiveWorkbook(workbookId: string) {
  const response = await fetch(`/api/shared-workbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workbookId }),
  });

  const jsonResponse = await response.json();
  return jsonResponse.data;
}
