import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon, HomeActive } from "@/components/svg/Navigate";
import MenuItem from ".";

const meta: Meta<typeof MenuItem> = {
  title: "Components/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: "select" },
    },
    handleClickItem: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const MenuItemStory: Story = {
  args: {
    id: "home",
    Icon: <HomeIcon />,
    itemName: "Home",
    activeIcon: <HomeActive />,
    isActive: false,
  },
};
