import type { Meta, StoryObj } from "@storybook/react";
import FindHeros from ".";

const meta: Meta<typeof FindHeros> = {
  title: "Fan/FindHeros",
  component: FindHeros,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FindHeros>;

export const FindHeros1: Story = {};
