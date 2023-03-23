import type { Meta, StoryObj } from "@storybook/react";
import SubscribeAthlete from ".";

const meta: Meta<typeof SubscribeAthlete> = {
  title: "Components/SubscribeAthlete",
  component: SubscribeAthlete,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SubscribeAthlete>;

export const SubscribeAthlete1: Story = {
  args: {
    message:
      "This action cannot be undone. Are you sure you want to delete this interaction?",
    confirm: "yes, delete Interaction",
    cancel: "Cancel",
    onCancel: () => console.log("cancel"),
    onSubmit: () => console.log("submit"),
  },
};
