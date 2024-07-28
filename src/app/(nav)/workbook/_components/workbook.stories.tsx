import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '@/app/_lib/constants';
import { Dummy_Workbooks } from '@/app/_lib/dummy';
import Page from '../page';
import Navigation from '@/app/(nav)/_components/navigation';
import Container from '@/components/container';

const meta = {
  title: 'Workbook',
  component: Page,
  decorators: [
    (Story) => (
      <Container className="w-[430px] h-[932px] bg-app-bg relative flex flex-col">
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
