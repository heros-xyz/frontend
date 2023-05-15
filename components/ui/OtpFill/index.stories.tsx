import type { Meta, StoryObj } from "@storybook/react";
import OtpFill from ".";

const meta: Meta<typeof OtpFill> = {
  title: "Components/OtpFill",
  component: OtpFill,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OtpFill>;

export const OtpFillComponent: Story = {
  args: {
    title: "OTP Verification",
    description: "We've emailed an OTP to you. Please enter the code here.",
    diffCount: 5,
    textButton: "VERIFY",
  },
};
