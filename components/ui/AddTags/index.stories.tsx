import type { Meta, StoryObj } from "@storybook/react";
import AddTags from "./index";

const meta: Meta<typeof AddTags> = {
  title: "Components/AddTags",
  component: AddTags,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AddTags>;

export const AddTagsStory: Story = {
};
