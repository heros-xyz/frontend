import type { Meta, StoryObj } from "@storybook/react";
import SearchResult from ".";

const meta: Meta<typeof SearchResult> = {
  title: "Fan/SearchResult",
  component: SearchResult,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchResult>;

export const SearchResult1: Story = {
  args: {
    data: [
      {
        id: "1",
        avatar:
          "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
        fullName: "Matt Prior",
        sport: "Bronze Tier Subscribed",
        totalInteractions: 105,
        totalFan: 5995,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "2",
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        fullName: "Mavis Breitenberg",
        sport: "Marathon",
        totalInteractions: 15,
        totalFan: 1955,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "3",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        fullName: "Marcus Mariota",
        sport: "Football",
        totalInteractions: 175,
        totalFan: 955,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "4",
        avatar: "https://www.w3schools.com/w3images/avatar2.png",
        fullName: "Marcus Mariota",
        sport: "Football",
        totalInteractions: 2,
        totalFan: 10,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
    ],
  },
};
