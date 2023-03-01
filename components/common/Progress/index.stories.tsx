import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./index";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const ProgressStory: Story = {
  render: (args) => <Progress {...args} />,
  args: {
    value: 40,
    w: 300,
    m: 4,
  },
};
