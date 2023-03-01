import type { Meta, StoryObj } from "@storybook/react";
import JustForYou from ".";

const meta: Meta<typeof JustForYou> = {
  title: "Components/JustForYou",
  component: JustForYou,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof JustForYou>;

export const JustForYou1: Story = {
  args: {
    href: "",
  },
};
