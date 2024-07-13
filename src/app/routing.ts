const MAIN_BASE: string = '/main';

export const MAIN_ROUTES = {
  workbook: MAIN_BASE + '/workbook',
  question: MAIN_BASE + '/question',
  share: MAIN_BASE + '/share',
  mypage: MAIN_BASE + '/mypage',
};

const SUB_BASE: string = '/sub';

export const SUB_ROUTES = {
  workbookDetail: (id: string): string => `${SUB_BASE}/workbookDetail/${id}`,
};
