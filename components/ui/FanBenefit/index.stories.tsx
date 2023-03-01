import type { Meta, StoryObj } from "@storybook/react";
import FanBenefit from ".";

const meta: Meta<typeof FanBenefit> = {
  title: "Components/FanBenefit",
  component: FanBenefit,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FanBenefit>;

export const FanBenefitComponent: Story = {};
