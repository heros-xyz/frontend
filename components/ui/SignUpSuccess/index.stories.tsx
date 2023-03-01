import type { Meta, StoryObj } from "@storybook/react";
import SignUpSuccess from ".";

const meta: Meta<typeof SignUpSuccess> = {
  title: "Components/SignUpSuccess",
  component: SignUpSuccess,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SignUpSuccess>;

export const SignUpSuccessComponent: Story = {
  args: {
    title: "Authentication Link Sent",
    description:
      "We’ve sent an authentication link to your email. Click the link to verify your sign in.",
    textButton: "resend link",
  },
};
