import type { Meta, StoryObj } from "@storybook/react";
import HerosSwiper from ".";

const meta: Meta<typeof HerosSwiper> = {
  title: "Components/HerosSwiper",
  component: HerosSwiper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HerosSwiper>;

export const HerosSwiperComponent: Story = {
  args: {
    width: "335px",
    height: "335px",
  },
};
