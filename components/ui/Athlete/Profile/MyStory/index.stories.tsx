import type { Meta, StoryObj } from "@storybook/react";
import MyStory from "./index";
const meta: Meta<typeof MyStory> = {
  title: "Components/MyStory",
  component: MyStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    gender: {
      options: ["male", "female"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyStory>;

export const MyStory1: Story = {
  args: {
    description:
      "A skilled wicketkeeper standing back, pugnacious batsman in the traditional keeping spot of No. 7 and a stout upholder of the team ethic, Matt Prior was a crucial cog in the machine that led England up the Test rankings.",
    dob: "26 feb 1982",
    gender: "male",
  },
};
