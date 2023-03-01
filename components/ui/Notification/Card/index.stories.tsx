import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import Card from "./index";

const item = {
  id: "1",
  type: "A_NEW_INTERACTION",
  message: "notification.athlete-new-interaction",
  source: {
    id: "48",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    fullName: "Sam Smith",
  },
  interaction: {
    id: "70",
    content: "some content should be trimmed if too long",
  },
  comment: {
    id: "b4e25260-1716-4c49-9e31-901551718c60",
    content: "eight",
    userId: "b59d63f8-8fdb-4f23-a9f1-dfe4572594af",
    createdAt: "2023-02-23T07:52:51.304Z",
  },
  readAt: null,
  createdAt: "2023-02-22T08:43:57.555Z",
};

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CardNotificationStory: Story = {
  render: (args) => (
    <Box bg="primary">
      <Card {...args} item={item} />
    </Box>
  ),
};
