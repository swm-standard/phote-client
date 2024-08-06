export type IQuestion = {
  questionId: string;
  statement: string;
  options: string[];
  image: string;
  category: IQuestionCategory;
  tags: IQuestionTag[];
};

export type IQuestionCategory = 'MULTIPLE' | 'ESSAY';
export type IQuestionTag = {
  name: string;
  createdAt: string;
  modifiedAt: string;
};
