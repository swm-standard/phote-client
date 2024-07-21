import { Workbook, QuestionInWorkbook, Question } from '@/app/_lib/types';

export const Dummy_Workbooks: Workbook[] = [
  {
    id: '1',
    title: '2023 기말고사',
    description: '2023 포철고 기말고사 대비',
    emoji: '🤓',
    quantity: 23,
    modifiedAt: new Date('2023-09-13'),
  },
  {
    id: '2',
    title: '2024 중간고사',
    description: '2024 제철중 중간고사 대비',
    emoji: '😜',
    quantity: 15,
    modifiedAt: new Date('2024-04-15'),
  },
];

export const Dummy_Workbook: Workbook = {
  id: '1',
  title: '2023 기말고사',
  description: '2023 포철고 기말고사 대비',
  emoji: '🤓',
  quantity: 23,
  modifiedAt: new Date('2023-09-13'),
};

export const Dummy_Questions: Question[] = [
  {
    id: '0',
    statement: '이 문제는 어디서부터 건너왔으며 어디서 나온다.',
    options: ['원', '삼각형', '직사각형', '오각형'],
    image: '이상한 url',
    answer: '4',
    category: '객관식',
    tags: ['미적분II', '3번틀린문제'],
    modifiedAt: new Date('2023-09-13'),
  },
  {
    id: '1',
    statement: 'cos + sin은 35도일 때 이를 위한 구성요소를 구하시오',
    options: ['30', '45', '60', '90'],
    image: '이상한 url',
    answer: '1',
    category: '객관식',
    tags: ['수학II', '이건태그얌'],
    modifiedAt: new Date('2023-09-13'),
  },
];

export const Dummy_Questions_In_Workbook: QuestionInWorkbook[] = [
  {
    id: '0',
    statement: '이 문제는 어디서부터 건너왔으며 어디서 나온다.',
    options: ['원', '삼각형', '직사각형', '오각형'],
    image: '이상한 url',
    answer: '4',
    category: '객관식',
    tags: ['미적분II', '3번틀린문제'],
    sequence: 1,
    modifiedAt: new Date('2023-09-13'),
  },
  {
    id: '1',
    statement: 'cos + sin은 35도일 때 이를 위한 구성요소를 구하시오',
    options: ['30', '45', '60', '90'],
    image: '이상한 url',
    answer: '1',
    category: '객관식',
    tags: ['수학II', '이건태그얌'],
    sequence: 2,
    modifiedAt: new Date('2023-09-13'),
  },
];
