import type { Meta, StoryObj } from "@storybook/react";
import AthleteOverview from ".";

const meta: Meta<typeof AthleteOverview> = {
  title: "Athlete/Overview",
  component: AthleteOverview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteOverview>;

export const AthleteDashboardOverview: Story = {};
