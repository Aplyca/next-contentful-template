import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Design System/Organisms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // sys: { id: 'DefaulTest' },
    title: "Dropdown",
    // internalLink: null,
    // externalLink: null
  },
};
