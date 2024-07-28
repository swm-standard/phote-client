export type Workbook = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  quantity: number;
  modifiedAt: Date;
};

export type Option = {
  value: string;
};

export type QuestionBase = {
  statement: string;
  options: Option[];
  image: string;
  answer: string;
  category: Category;
  tags: string[];
  memo: string;
};

export type Question = {
  id: string;
  modifiedAt: Date;
} & QuestionBase;

export type QuestionInWorkbook = {
  sequence: number;
} & Question;

export type Status = 'loading' | 'error' | 'success';

export type Category = 'MULTIPLE' | 'ESSAY';
