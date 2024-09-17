import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/app/_lib/constants';
import { Dummy_Questions } from '@/app/_lib/dummy';

import Page from '../app/(after-login)/(top)/register-question/[workbookId]/page';
import Container from '@/components/container';
import Header from '@/app/(after-login)/(top)/header';

const meta = {
  title: 'Register Question',
  component: Page,
  decorators: [
    (Story) => (
      <Container className="flex h-[932px] w-[430px] flex-col bg-app-bg">
        <Header />
        <Story />
      </Container>
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
        segments: ['register-question', ['workbookId', '1']],
      },
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullQuestions: Story = {
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

export const SomeQuestions: Story = {
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
          return HttpResponse.json(Dummy_Questions.slice(0, 4));
        }),
      ],
    },
  },
};

export const EmptyQuestions: Story = {
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
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
