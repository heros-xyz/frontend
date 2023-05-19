import type { Meta, StoryObj } from "@storybook/react";
import Bronze from ".";

const meta: Meta<typeof Bronze> = {
  title: "Fan/Bronze",
  component: Bronze,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Bronze>;

export const BronzeUnchecked: Story = {
  args: {
    title: "Bronze",
    data: {
      id: "b5d35381-fa50-4fd9-b425-d76f30975380",
      updatedAt: "2023-02-07T06:38:24.313Z",
      deletedAt: null,
      name: "Test Sub",
      monthlyPrice: 1,
      tierDescription:
        "Let your fans know what they can get from this membership tier.",
      benefits: [
        {
          key: "0fc992d7-d9b0-40e8-8e73-f88d1a21780d",
          label: "Early access to content",
        },
      ],
    },
    checked: false,
  },
};

export const BronzeChecked: Story = {
  args: {
    title: "Bronze",
    data: {
      id: "b5d35381-fa50-4fd9-b425-d76f30975380",
      name: "Test Sub",
      monthlyPrice: 1,
      tierDescription:
        "Let your fans know what they can get from this membership tier.",
      benefits: [
        {
          key: "0fc992d7-d9b0-40e8-8e73-f88d1a21780d",
          label: "Early access to content",
        },
      ],
    },
    hasRadioButton: true,
    checked: true,
  },
};
