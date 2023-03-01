import type { Meta, StoryObj } from "@storybook/react";
import Tagline from ".";

const meta: Meta<typeof Tagline> = {
  title: "Athlete/Tagline",
  component: Tagline,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Tagline>;

export const TaglineStory: Story = {};
