import { Workbook, QuestionInWorkbook, Question } from '@/app/_lib/types';

export const Dummy_Workbooks: Workbook[] = [
  {
    id: '1',
    title: '23년도 3월 모의고사 오답 모음',
    description: '화이팅 화이팅',
    emoji: '🤓',
    quantity: 25,
    modifiedAt: new Date('2024-04-15'),
  },
  {
    id: '2',
    title: '과학 문제 모음',
    description: '쎈, 마더텅',
    emoji: '👿',
    quantity: 10,
    modifiedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    title: '23년도 9월차 포엠 수학 재시험',
    description:
      '80점 미만 재시험으로 인해서 집에 가지 못하는 불상사가 발생한 하루이다.',
    emoji: '🤢',
    quantity: 10,
    modifiedAt: new Date('2023-05-31'),
  },
  {
    id: '4',
    title:
      '문제집의 이름을 길게하고 싶은 경우 이런식으로 문제집의 이름을 만들 수 있지않을까?',
    description: '한줄 소개는 이정도로 하자',
    emoji: '💩',
    quantity: 0,
    modifiedAt: new Date('2022-06-07'),
  },
  {
    id: '5',
    title: '23년도 3월 모의고사 오답 모음',
    description: '화이팅 화이팅',
    emoji: '🤓',
    quantity: 25,
    modifiedAt: new Date('2024-04-15'),
  },
  {
    id: '6',
    title: '과학 문제 모음',
    description: '쎈, 마더텅',
    emoji: '👿',
    quantity: 10,
    modifiedAt: new Date('2024-01-15'),
  },
  {
    id: '7',
    title: '23년도 9월차 포엠 수학 재시험',
    description:
      '80점 미만 재시험으로 인해서 집에 가지 못하는 불상사가 발생한 하루이다.',
    emoji: '🤢',
    quantity: 10,
    modifiedAt: new Date('2023-05-31'),
  },
  {
    id: '8',
    title:
      '문제집의 이름을 길게하고 싶은 경우 이런식으로 문제집의 이름을 만들 수 있지않을까?',
    description: '한줄 소개는 이정도로 하자',
    emoji: '💩',
    quantity: 0,
    modifiedAt: new Date('2022-06-07'),
  },
  {
    id: '1',
    title: '23년도 3월 모의고사 오답 모음',
    description: '화이팅 화이팅',
    emoji: '🤓',
    quantity: 25,
    modifiedAt: new Date('2024-04-15'),
  },
  {
    id: '2',
    title: '과학 문제 모음',
    description: '쎈, 마더텅',
    emoji: '👿',
    quantity: 10,
    modifiedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    title: '23년도 9월차 포엠 수학 재시험',
    description:
      '80점 미만 재시험으로 인해서 집에 가지 못하는 불상사가 발생한 하루이다.',
    emoji: '🤢',
    quantity: 10,
    modifiedAt: new Date('2023-05-31'),
  },
  {
    id: '4',
    title:
      '문제집의 이름을 길게하고 싶은 경우 이런식으로 문제집의 이름을 만들 수 있지않을까?',
    description: '한줄 소개는 이정도로 하자',
    emoji: '💩',
    quantity: 0,
    modifiedAt: new Date('2022-06-07'),
  },
  {
    id: '5',
    title: '23년도 3월 모의고사 오답 모음',
    description: '화이팅 화이팅',
    emoji: '🤓',
    quantity: 25,
    modifiedAt: new Date('2024-04-15'),
  },
  {
    id: '6',
    title: '과학 문제 모음',
    description: '쎈, 마더텅',
    emoji: '👿',
    quantity: 10,
    modifiedAt: new Date('2024-01-15'),
  },
  {
    id: '7',
    title: '23년도 9월차 포엠 수학 재시험',
    description:
      '80점 미만 재시험으로 인해서 집에 가지 못하는 불상사가 발생한 하루이다.',
    emoji: '🤢',
    quantity: 10,
    modifiedAt: new Date('2023-05-31'),
  },
  {
    id: '8',
    title:
      '문제집의 이름을 길게하고 싶은 경우 이런식으로 문제집의 이름을 만들 수 있지않을까?',
    description: '한줄 소개는 이정도로 하자',
    emoji: '💩',
    quantity: 0,
    modifiedAt: new Date('2022-06-07'),
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
