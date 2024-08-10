'use server';

import { IWorkbookBase } from '@/model/i-workbook';
import authFetch from '@/util/auth-fetch';

export async function readWorkbooks() {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbooks`,
      { method: 'GET' },
    );
    return jsonRaw.data;
  } catch (e) {
    console.error(`readWorkbooks failed by ${e}`);
  }
}

export async function createWorkbook(workbookBase: IWorkbookBase) {
  try {
    const jsonRaw = await authFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workbook`,
      {
        method: 'POST',
        body: JSON.stringify(workbookBase),
      },
    );
    return jsonRaw;
  } catch (e) {
    console.error(`readWorkbooks failed by ${e}`);
  }
}
