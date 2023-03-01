import type { Meta, StoryObj } from "@storybook/react";
import JoinPage from "./index";

const meta: Meta<typeof JoinPage> = {
  title: "Components/JoinPage",
  component: JoinPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof JoinPage>;

export const JoinHerosPage: Story = {};
