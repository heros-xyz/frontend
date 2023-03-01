import type { Meta, StoryObj } from "@storybook/react";
import Membership from "./index";

const meta: Meta<typeof Membership> = {
  title: "Athlete/Membership",
  component: Membership,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    buttonContent: {
      if: { arg: "isMembership", truthy: false }
    },
    tier: {
      if: { arg: "isMembership"}
    },
  },
};

export default meta;
type Story = StoryObj<typeof Membership>;

export const MembershipTemplate: Story = {
  args: {
    title: "Membership",
    tier: 1,
    isMembership: true,
    buttonContent: "Add tier"
  },
};
