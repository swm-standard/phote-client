import type { Meta, StoryObj } from '@storybook/react';
import { Workbook } from '@/app/main/workbook/workbook-cards';

import { http, HttpResponse, delay } from 'msw';
import Page from './page';
import { readWorkbooksUrl } from '@/app/main/workbook/endpoint';

const meta = {
  title: 'Workbook',
  component: Page,
  decorators: [
    (Story) => (
      <div className="w-[430px] h-[932px] bg-white relative">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Page>;

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

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(readWorkbooksUrl, () => {
          return HttpResponse.json(TestData);
        }),
      ],
    },
  },
};

export const FailReadingWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(readWorkbooksUrl, async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
