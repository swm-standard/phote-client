export type IQuestion = {
  questionId: string;
  statement: string;
  options: string[];
  image?: string;
  category: IQuestionCategory;
  tags: IQuestionTag[];
};

export type IQuestionCategory = 'MULTIPLE' | 'ESSAY';
export type IQuestionTag = {
  name: string;
  createdAt: string;
  modifiedAt: string;
};

export type ICreateQuestion = {
  statement: string;
  image: string;
  category: IQuestionCategory;
  options: Option[];
  answer: string;
  tags: string[];
  memo: string;
};

type Option = {
  value: string;
};

export const EmptyCreateQuestion: ICreateQuestion = {
  statement: '',
  image: '',
  category: 'MULTIPLE',
  options: [],
  answer: '',
  tags: [],
  memo: '',
};
