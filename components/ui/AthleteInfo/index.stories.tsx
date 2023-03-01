import type { Meta, StoryObj } from "@storybook/react";
import AthleteInfo from ".";

const meta: Meta<typeof AthleteInfo> = {
  title: "Components/AthleteInfo",
  component: AthleteInfo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteInfo>;

export const AthleteInfoComponent: Story = {
  args: {
    imagePath: "/images/heros.png",
    athleteName: "Matt Prior",
    publishDate: "26/10/22",
  },
};
