import type { Meta, StoryObj } from "@storybook/react";
import Delete from ".";

const meta: Meta<typeof Delete> = {
  title: "Components/Delete",
  component: Delete,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Delete>;

export const Delete1: Story = {
  args: {
    message:
      "This action cannot be undone. Are you sure you want to delete this interaction?",
    confirm: "yes, delete Interaction",
    cancel: "Cancel",
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  },
};

export const Delete2: Story = {
  args: {
    title: "Restricted to fans only",
    message: "Please subscribe to view all content from your favorite athlete.",
    confirm: "join now",
    cancel: "Cancel",
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  },
};

export const Delete3: Story = {
  args: {
    message: "You have to verify your email before subscribing to an athlete.",
    confirm: "OK",
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  },
};
