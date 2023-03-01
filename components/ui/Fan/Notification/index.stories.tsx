import type { Meta, StoryObj } from "@storybook/react";
import NotificationFan from ".";

const meta: Meta<typeof NotificationFan> = {
  title: "Components/FanNotification",
  component: NotificationFan,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationFan>;

export const Notification: Story = {
  args: {
    pageType: "fan",
  },
};
