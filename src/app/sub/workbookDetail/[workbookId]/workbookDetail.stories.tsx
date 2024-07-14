import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { readWorkbookByIdUrl } from '@/app/endpoint';
import { Dummy_Workbook } from '@/app/dummy';

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
        http.get(readWorkbookByIdUrl('1'), () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
      ],
    },
  },
};

export const FailReadingWorkbookById: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(readWorkbookByIdUrl('1'), async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
