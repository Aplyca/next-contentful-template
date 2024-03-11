import type { Meta, StoryObj } from '@storybook/react';

import { RICHTEXT_SHORT_SIMPLE } from '@/constants/mocks.constants';

import PromoDefaultBlock from './PromoDefaultBlock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Design System/Blocks/PromoDefault',
  component: PromoDefaultBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    simpleView: {
      control: 'select',
      options: [
        'Main image',
      ],
    },
  },
} satisfies Meta<typeof PromoDefaultBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    __typename: 'PromoBlock',
    sys: { id: 'Test' },
    name: 'Promo Block',
    title: 'Promo Block Title',
    description: RICHTEXT_SHORT_SIMPLE,
    simpleView: null,
    customView: {
      name: 'PromoBlockDefault',
      alignment: 'Center',
      itemsPerRow: 3,
    },
  },
};

export const MainImage: Story = {
  args: {
    ...Default.args,
    name: 'Promo Block',
    simpleView: 'Main image',
  },
};
