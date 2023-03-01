import type { Meta, StoryObj } from "@storybook/react";
import AddTag from ".";

const meta: Meta<typeof AddTag> = {
  title: "Athlete/AddTag",
  component: AddTag,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AddTag>;

export const AddTagStory: Story = {};
