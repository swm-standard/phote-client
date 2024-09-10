import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { Dummy_Questions, Dummy_Workbook } from '@/app/_lib/dummy';

import Page from '../../page';
import Header from '@/app/(after-login)/(top)/header';
import StorybookContainer from '@/components/storybook-container';

const meta = {
  title: 'WorkbookDetail',
  component: Page,
  decorators: [
    (Story) => (
      <StorybookContainer>
        <Header />
        <Story />
      </StorybookContainer>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['workbookDetail', ['workbookId', '1']],
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const FullQuestions: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
        http.get(`${BASE_URL}/workbook/questions/1`, () => {
          return HttpResponse.json(Dummy_Questions);
        }),
      ],
    },
  },
};

export const SomeQuestions: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
        http.get(`${BASE_URL}/workbook/questions/1`, () => {
          return HttpResponse.json(Dummy_Questions.slice(1, 5));
        }),
      ],
    },
  },
};

export const NoQuestions: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbook/1`, () => {
          return HttpResponse.json(Dummy_Workbook);
        }),
        http.get(`${BASE_URL}/workbook/questions/1`, () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
