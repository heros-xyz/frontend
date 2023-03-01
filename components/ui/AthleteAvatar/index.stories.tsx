import type { Meta, StoryObj } from "@storybook/react";
import AthleteAvatar from "./";

const meta: Meta<typeof AthleteAvatar> = {
  title: "Athlete/AthleteAvatar",
  component: AthleteAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteAvatar>;

export const AthleteAvatarStr: Story = {
  args: {
    imageUrl:
      "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    isRecommend: false,
    name: "John Smith",
  },
};

export const AthleteAvatarRecomend: Story = {
  args: {
    imageUrl:
      "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
    isRecommend: true,
    name: "John Smith",
  },
};
