import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import WorkbookCards, { Workbook } from '@/app/main/workbook/workbook-cards';
import WorkbookArea from '@/app/main/workbook/workbook-area';

import { http, HttpResponse, delay } from 'msw';

const meta = {
  title: 'Test',
  component: WorkbookArea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WorkbookArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TestData: Workbook[] = [
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

const url = 'http://localhost:3000/api/workbooks';

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(url, () => {
          return HttpResponse.json(TestData);
        }),
      ],
    },
  },
};

export const MockedFailure: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(url, async () => {
          await delay(800);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
