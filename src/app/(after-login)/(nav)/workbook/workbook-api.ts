import { IWorkbookBase } from '@/model/i-workbook';

let session: any;
if (typeof window !== 'undefined') {
  session = localStorage.getItem('accessToken');
}

export async function readWorkbooks() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbooks`,
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
    console.error(`readWorkbooks failed by ${e}`);
  }
}

export async function createWorkbook(workbookBase: IWorkbookBase) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(workbookBase),
      },
    );

    return await response.json();
  } catch (e) {
    console.error(`readWorkbooks failed by ${e}`);
  }
}
