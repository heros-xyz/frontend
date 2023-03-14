import type { Meta, StoryObj } from "@storybook/react";
import ItemSuggestions from ".";

const meta: Meta<typeof ItemSuggestions> = {
  title: "Components/ItemSuggestions",
  component: ItemSuggestions,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ItemSuggestions>;

export const Item: Story = {
  args: {
    item: {
      avatar: "",
      fullName: "Marshall",
      sport: "Surfing",
      id: "",
      nickName: "",
    },
  },
};
