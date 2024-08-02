import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/app/_lib/constants';
import { Dummy_Questions } from '@/app/_lib/dummy';

import Page from './page';
import Navigation from '@/app/(nav)/_components/navigation';
import Container from '@/components/container';

const meta = {
  title: 'Question',
  component: Page,
  decorators: [
    (Story) => (
      <Container className="flex h-[932px] w-[430px] flex-col bg-app-bg">
        <Story />
        <Navigation />
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
