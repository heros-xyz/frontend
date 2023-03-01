import type { Meta, StoryObj } from "@storybook/react";
import DashboardSidebar from ".";

const meta: Meta<typeof DashboardSidebar> = {
  title: "Components/Sidebar",
  component: DashboardSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    tabValue: {
      options: ["home", "noti", "interaction", "fan", "profile"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardSidebar>;

export const BottomBarStory: Story = {
  args: {
    tabValue: "home",
  },
  render: (args) => {
    console.log(args);

    return <DashboardSidebar {...args} />;
  },
};
