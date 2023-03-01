import type { Meta, StoryObj } from "@storybook/react";
import Notification from ".";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const NotificationAthlete: Story = {
  args: {
    pageType: "athlete",
  },
};
