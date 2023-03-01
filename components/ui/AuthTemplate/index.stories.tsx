import type { Meta, StoryObj } from "@storybook/react";
import AuthTemplate from "./index";

const meta: Meta<typeof AuthTemplate> = {
  title: "Components/AuthTemplate",
  component: AuthTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    pageType: {
      options: ["athlete", "fan", "signin"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const AuthTemplateStory: Story = {
  args: {
    pageType: "athlete",
  },
};
