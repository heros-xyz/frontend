import type { Meta, StoryObj } from "@storybook/react";
import FanLatestInteractions from ".";

const meta: Meta<typeof FanLatestInteractions> = {
  title: "Fan/FanLatestInteractions",
  component: FanLatestInteractions,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FanLatestInteractions>;

export const FanInteractions: Story = {
  args: {
    titleHeading: "Latest interactions",
    actionText: "view all",
    items: [
      {
        id: "1",
        content: "hehe",
        user: {
          id: "1",
          avatar: "/images/small_img_athletes.png",
        },
        interactionMedia: [
          {
            id: "12345",
            url: "/images/small_img_athletes.png",
            createdAt: "",
            extension: "",
            sortOrder: 2,
            type: "",
            updatedAt: "",
          },
          {
            id: "12345",
            url: "/images/small_img_athletes.png",
            createdAt: "",
            extension: "",
            sortOrder: 3,
            type: "",
            updatedAt: "",
          },
        ],
      },
      {
        id: "1",
        content: "hehe",
        user: {
          id: "1",
          avatar: "/images/small_img_athletes.png",
        },
        interactionMedia: [
          {
            id: "12345",
            url: "/images/small_img_athletes.png",
            createdAt: "",
            extension: "",
            sortOrder: 3,
            type: "",
            updatedAt: "",
          },
        ],
      },
    ],
  },
};
