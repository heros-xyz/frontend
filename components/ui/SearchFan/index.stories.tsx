import type { Meta, StoryObj } from "@storybook/react";
import { ChangeEvent } from "react";
import SearchFan from ".";

const meta: Meta<typeof SearchFan> = {
  title: "Fan/SearchFan",
  component: SearchFan,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof SearchFan>;

export const SearchFanAthletelist: Story = {
  render: (args) => <SearchFan {...args}>Search with name</SearchFan>,
  args: {
    placeholder: "Search Fans",
    handleChange: (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    },
  },
};
