const BASE_URL = 'http://localhost:3000';

export const readWorkbooksUrl: string = `${BASE_URL}/workbooks`;
export const createWorkbookUrl: string = `${BASE_URL}/workbook`;
export const readWorkbookByIdUrl = (id: string) => `${BASE_URL}/workbook/${id}`;
