import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/app/_lib/constants';
import { Dummy_Questions } from '@/app/_lib/dummy';

import Page from './page';

const meta = {
  title: 'Question',
  component: Page,
  decorators: [
    (Story) => (
      <div className="relative h-[932px] w-[430px] bg-white">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          tags: 'test1,test2',
          keywords: 'key1,key2',
        },
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    searchParams: {
      tags: 't1,t2',
      keywords: 'k1,k2',
    },
  },

  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/questions`, () => {
          return HttpResponse.json(Dummy_Questions);
        }),
      ],
    },
  },
};

// export const FailReadingWorkbookAndQuestionAndDeletingWorkbook: Story = {
//   parameters: {
//     msw: {
//       handlers: [
//         http.get(`${BASE_URL}/workbook/1`, async () => {
//           await delay(1000);
//           return new HttpResponse(null, {
//             status: 403,
//           });
//         }),
//         http.get(`${BASE_URL}/workbook/questions/1`, async () => {
//           await delay(1000);
//           return new HttpResponse(null, {
//             status: 403,
//           });
//         }),
//       ],
//     },
//   },
// };
