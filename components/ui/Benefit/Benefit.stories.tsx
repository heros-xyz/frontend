import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "../../svg/Menu";
import Benefit from "./index";

const meta: Meta<typeof Benefit> = {
  title: "Components/Benefit",
  component: Benefit,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      options: ["Benefit No.1", "Benefit No.2", "Benefit No.3", "Benefit No.4"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Benefit>;

export const Benefit3: Story = {
  args: {
    Icon: <Menu color="tomato" />,
    title: "Benefit No.3",
    description:
      "Purus lobortis volutpat posuere id integer nunc tellus. Non mauris malesuada feugiat massa mi pellentesque cum est. Pharetra a varius urna rhoncus, tempor rutrum.",
  },
};
