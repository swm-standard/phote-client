import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '@/app/constants';
import { Dummy_Questions } from '@/app/dummy';

import Page from './page';

const meta = {
  title: 'Question',
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
