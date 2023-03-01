import type { Meta, StoryObj } from "@storybook/react";
import BottomBar from ".";

const meta: Meta<typeof BottomBar> = {
  title: "Components/BottomBar",
  component: BottomBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    tabValue: {
      options: ["home", "noti", "interaction", "fan", "profile"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomBar>;

export const BottomBarStory: Story = {
  args: {
    tabValue: "home",
  },
  render: (args) => {
    console.log(args);

    return <BottomBar {...args} />;
  },
};
