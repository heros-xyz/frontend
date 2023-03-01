import type { Meta, StoryObj } from "@storybook/react";
import OrderSummary from ".";

const meta: Meta<typeof OrderSummary> = {
  title: "Components/OrderSumary",
  component: OrderSummary,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const OrderSummary1: Story = {
  args: {
    userName: "Matt Prior",
    tier: "Bronze tier",
    price: "$5.00",
    dateRenew: "22 Jan 2023",
  },
};
