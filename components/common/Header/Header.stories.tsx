import type { Meta, StoryObj } from "@storybook/react";
import Header from "./index";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {};
