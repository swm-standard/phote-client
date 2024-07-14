export type Workbook = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  quantity: number;
  modifiedAt: Date;
};

export type Question = {
  id: string;
  status: string;
  options: string;
  image: string;
  answer: string;
  category: string;
  tags: string[];
  modifiedAt: Date;
};

export type QuestionInWorkbook = {
  sequence: number;
} & Question;

export type Status = 'loading' | 'error' | 'success';
