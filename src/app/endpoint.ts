const BASE_URL = 'http://localhost:3000/api';

export const readWorkbooksUrl: string = `${BASE_URL}/workbooks`;
export const createWorkbookUrl: string = `${BASE_URL}/workbook`;

export const readWorkbookByIdUrl = (id: string) => `${BASE_URL}/workbook/${id}`;
export const deleteWorkbookByIdUrl = (id: string) => readWorkbookByIdUrl(id);

export const readQuestionInWorkbook = (id: string) =>
  `${BASE_URL}/workbook/questions/${id}`;
