// Information needed to create a workbook
export type IWorkbookBase = {
  title: string;
  description: string;
};

export type IWorkbook = IWorkbookBase & {
  workbookId: string;
  emoji: string;
  quantity: number;
  modifiedAt: string;
};
