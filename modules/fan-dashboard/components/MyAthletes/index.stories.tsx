import type { Meta, StoryObj } from "@storybook/react";
import MyAtheletes from ".";

const meta: Meta<typeof MyAtheletes> = {
  title: "Athlete/MyAtheletes",
  component: MyAtheletes,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MyAtheletes>;

export const MyAtheletesStr: Story = {
  args: {
    athletes: [
      {
        name: " John Smith",
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        isRecommend: false,
      },
      {
        name: " John Smith",
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        isRecommend: false,
      },
      {
        name: " John Smith",
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        isRecommend: false,
      },
      {
        name: " John Smith",
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        isRecommend: true,
      },
      {
        name: " John Smith",
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        isRecommend: true,
      },
    ],
  },
};
