import type { Meta, StoryObj } from "@storybook/react";
import YourAthletesList from ".";

const meta: Meta<typeof YourAthletesList> = {
  title: "Fan/YourAthletes",
  component: YourAthletesList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export interface YourAthlete {
  avatar: string;
  fullName: string;
  description?: string;
  createdAt: string | Date;
  id?: string;
  email?: string;
}

export default meta;
type Story = StoryObj<typeof YourAthletesList>;

export const FanYourAthletes: Story = {
  args: {
    athleteList: [
      {
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        fullName: "Matt Prior",
        description: " Bronze Tier Subscribed",
        createdAt: "22/12/2022",
        nickName: "a",
        athleteId: "1",
      },
      {
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        fullName: "Matt Prior",
        description: " Bronze Tier Subscribed",
        createdAt: "22/12/2022",
        nickName: "a",
        athleteId: "1",
      },
      {
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        fullName: "Matt Prior",
        description: " Bronze Tier Subscribed",
        createdAt: "22/12/2022",
        nickName: "a",
        athleteId: "1",
      },
      {
        avatar:
          "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",
        fullName: "Matt Prior",
        description: " Bronze Tier Subscribed",
        createdAt: "22/12/2022",
        nickName: "a",
        athleteId: "1",
      },
    ],
  },
};
