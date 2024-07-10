import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import WorkbookCards, { Workbook } from '@/app/main/workbook/workbook-cards';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Test',
  component: WorkbookCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof WorkbookCards>;

export default meta;
type Story = StoryObj<typeof meta>;

const TestData: Workbook[] = [
  {
    id: '1',
    title: '2023 기말고사',
    description: '2023 포철고 기말고사 대비',
    emoji: '🤓',
    quantity: 23,
    modifiedAt: new Date('2023-09-13'),
  },
  {
    id: '2',
    title: '2024 중간고사',
    description: '2024 제철중 중간고사 대비',
    emoji: '😜',
    quantity: 15,
    modifiedAt: new Date('2024-04-15'),
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    workbooks: TestData,
  },
};

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };
//
// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };
//
// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
