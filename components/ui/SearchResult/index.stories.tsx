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
        sourceSubscriptionsTotal: 105,
        fan: 5995,
      },
      {
        id: "2",
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        fullName: "Mavis Breitenberg",
        sport: "Marathon",
        sourceSubscriptionsTotal: 15,
        fan: 1955,
      },
      {
        id: "3",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        fullName: "Marcus Mariota",
        sport: "Football",
        sourceSubscriptionsTotal: 175,
        fan: 955,
      },
      {
        id: "4",
        avatar: "https://www.w3schools.com/w3images/avatar2.png",
        fullName: "Marcus Mariota",
        sport: "Football",
        sourceSubscriptionsTotal: 2,
        fan: 10,
      },
    ],
  },
};
