import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/app/_lib/constants';
import { Dummy_Workbooks } from '@/app/_lib/dummy';
import Page from '../page';
import Container from '@/components/container';
import Navigation from '@/app/(after-login)/(nav)/_components/navigation';

const meta = {
  title: 'Workbook',
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
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, () => {
          return HttpResponse.json(Dummy_Workbooks);
        }),
      ],
    },
  },
};

export const SomeWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, () => {
          return HttpResponse.json(Dummy_Workbooks.slice(0, 4));
        }),
      ],
    },
  },
};

export const NoWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
