import { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    btnType: 'default',
    children: 'Button',
  },
};

export const ButtonType: Story = {
  render: () => {
    return (
      <>
        <Button btnType="primary">Primary Button</Button>
        <Button btnType="danger">Danger Button</Button>
        <Button btnType="link">Link Button</Button>
        <Button btnType="default">Default Button</Button>
      </>
    );
  },
};

export const ButtonSize: Story = {
  render: () => {
    return (
      <>
        <Button size="lg">Large Button</Button>
        <Button size="sm">Small Button</Button>
      </>
    );
  },
};
