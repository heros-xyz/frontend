import type { Meta, StoryObj } from "@storybook/react";
import AddFirstMilestone from ".";

const meta: Meta<typeof AddFirstMilestone> = {
  title: "Athlete/AddFirstMilestone",
  component: AddFirstMilestone,
  tags: ["autodocs"],
  parameters: {
    layout: "xl",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AddFirstMilestone>;

export const AddFirstMilestone1: Story = {};
