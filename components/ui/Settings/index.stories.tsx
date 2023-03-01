import type { Meta, StoryObj } from "@storybook/react";
import AthleteFanSettings from ".";

const meta: Meta<typeof AthleteFanSettings> = {
  title: "Components/Settings",
  component: AthleteFanSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    type: {
      options: ["FAN", "ATHLETE"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AthleteFanSettings>;

export const Settings: Story = {
  args: {
    name: "Tatum Miller",
    email: "tatummiller@gmail.com",
    isLoginWithGoogle: true,
    isLoginWithFacebook: true,
    type: "FAN",
  },
};
