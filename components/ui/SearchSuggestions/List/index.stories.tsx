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
        sourceSubscriptionsTotal: 10,
      },
      {
        id: "2",
        avatar: "",
        fullName: "Mavis Breitenberg",
        sourceSubscriptionsTotal: 10,
        sport: "Marathon",
      },
      {
        id: "3",
        avatar: "",
        fullName: "Marcus Mariota",
        sport: "Football",
        sourceSubscriptionsTotal: 10,
      },
      {
        id: "4",
        avatar: "",
        fullName: "Marshall Eriksen",
        sport: "Surfing",
        sourceSubscriptionsTotal: 10,
      },
    ],
  },
};
