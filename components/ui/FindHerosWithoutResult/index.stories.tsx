import type { Meta, StoryObj } from "@storybook/react";
import FindHerosWithoutResult from ".";

const meta: Meta<typeof FindHerosWithoutResult> = {
  title: "Fan/FindHerosWithoutResult",
  component: FindHerosWithoutResult,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FindHerosWithoutResult>;

export const FindHerosWithoutResult1: Story = {};
