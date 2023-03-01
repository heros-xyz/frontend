import type { Meta, StoryObj } from "@storybook/react";
import AddMilestone from ".";

const meta: Meta<typeof AddMilestone> = {
  title: "Athlete/AddMilestone",
  component: AddMilestone,
  tags: ["autodocs"],
  parameters: {
    layout: "base",
  },
};

export default meta;
type Story = StoryObj<typeof AddMilestone>;

export const AddMilestoneStory: Story = {};
