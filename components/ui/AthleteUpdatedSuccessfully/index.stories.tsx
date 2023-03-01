import type { Meta, StoryObj } from "@storybook/react";
import AthleteUpdatedSuccessfully from ".";

const meta: Meta<typeof AthleteUpdatedSuccessfully> = {
  title: "Components/AthleteUpdatedSuccessfully",
  component: AthleteUpdatedSuccessfully,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteUpdatedSuccessfully>;

export const NotificationAthlete: Story = {};
