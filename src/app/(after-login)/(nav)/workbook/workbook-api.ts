import { IWorkbookBase } from '@/model/i-workbook';

export async function readWorkbooks() {
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
