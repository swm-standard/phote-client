import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { Dummy_Workbooks } from '@/app/_lib/dummy';

import Page from '../page';
import Navigation from '@/app/(after-login)/(nav)/_components/navigation';
import StorybookContainer from '@/components/storybook-container';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const meta = {
  title: 'Workbook',
  component: Page,
  decorators: [
    (Story) => (
      <StorybookContainer>
        <Story />
        <Navigation />
      </StorybookContainer>
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
