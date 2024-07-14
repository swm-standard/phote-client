import { Workbook } from '@/app/types';

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
