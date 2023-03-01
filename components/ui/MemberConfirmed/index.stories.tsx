import type { Meta, StoryObj } from "@storybook/react";
import { MemberConfirmedIcon } from "@/components/svg/MemberCofirmedIcon";
import MemberConfirmed from ".";

const meta: Meta<typeof MemberConfirmed> = {
  title: "Components/MemberConfirmed",
  component: MemberConfirmed,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MemberConfirmed>;

export const MemberConfirmedStory: Story = {
  args: {
    Icon: <MemberConfirmedIcon />,
    title: "Membership Confirmed",
    description:
      "You are now a fan of Matt Prior! Get started by exploring the benefits that come with your membership.",
    textButton: "back to athlete profile",
  },
};
