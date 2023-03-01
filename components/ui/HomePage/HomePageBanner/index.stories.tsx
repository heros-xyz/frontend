import type { Meta, StoryObj } from "@storybook/react";
import HomePageBanner from "./index";

const meta: Meta<typeof HomePageBanner> = {
  title: "HomePage/HomePageBanner",
  component: HomePageBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HomePageBanner>;

export const Banner: Story = {
  args: {
    title: "For athletes, by fans",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
