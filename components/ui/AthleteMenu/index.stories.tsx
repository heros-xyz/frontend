import type { Meta, StoryObj } from "@storybook/react";
import { EditIcon } from "@components/svg/menu/EditIcon";
import { DeleteIcon } from "@components/svg/menu/DeleteIcon";
import AthleteMenu from ".";

const meta: Meta<typeof AthleteMenu> = {
  title: "Components/AthleteMenu",
  component: AthleteMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteMenu>;

export const AthleteMenuComponent: Story = {
  args: {
    menuList: [
      {
        id: "edit",
        itemName: "Edit",
        Icon: <EditIcon />,
      },
      {
        id: "delete",
        itemName: "Delete",
        Icon: <DeleteIcon />,
      },
    ],
  },
};
