import type { Meta, StoryObj } from "@storybook/react";
import SearchSuggestionsList from ".";

const meta: Meta<typeof SearchSuggestionsList> = {
  title: "Components/SearchSuggestionsList",
  component: SearchSuggestionsList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SearchSuggestionsList>;

export const List: Story = {
  args: {
    buttonName: "See all results",
    items: [
      {
        id: "1",
        avatar: "",
        fullName: "Matt Prior",
        sport: "Cricket",
        totalInteractions: 10,
        totalFan: 36,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "2",
        avatar: "",
        fullName: "Mavis Breitenberg",
        totalInteractions: 10,
        sport: "Marathon",
        totalFan: 36,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "3",
        avatar: "",
        fullName: "Marcus Mariota",
        sport: "Football",
        totalInteractions: 10,
        totalFan: 36,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
      {
        id: "4",
        avatar: "",
        fullName: "Marshall Eriksen",
        sport: "Surfing",
        totalInteractions: 10,
        totalFan: 36,
        nickName: "",
        isCurrentUserSubscribed: true,
      },
    ],
  },
};
