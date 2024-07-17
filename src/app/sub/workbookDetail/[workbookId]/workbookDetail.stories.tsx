import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '@/app/constants';
import { Dummy_Questions_In_Workbook, Dummy_Workbook } from '@/app/dummy';

import Page from './page';

const meta = {
  title: 'WorkbookDetail',
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
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [['workbookId', '1']],
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
        http.get(`${BASE_URL}/workbook/questions/1`, () => {
          return HttpResponse.json(Dummy_Questions_In_Workbook);
        }),
        http.delete(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json({
            result: 'SUCCESS',
            status: 200,
          });
        }),
      ],
    },
  },
};

export const FailReadingWorkbookAndQuestion: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
        http.get(`${BASE_URL}/workbook/questions/1`, async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

export const FailDeletingWorkbookById: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
        http.delete(`${BASE_URL}/workbook/1`, () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
