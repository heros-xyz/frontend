import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import FanStayUpToDate from ".";

const meta: Meta<typeof FanStayUpToDate> = {
  title: "Fan/FanStayupToDate",
  component: FanStayUpToDate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FanStayUpToDate>;

export const FanStayupToDate1: Story = {
  render: (args) => (
    <Box>
      <FanStayUpToDate {...args} />
    </Box>
  ),
  args: {
    data: [
      {
        id: "1",
        totalNewestInteraction: 20,
        status: 1,
        targetUser: {
          id: "1",
          avatar: "1",
          firstName: "a",
          lastName: "b",
        },
      },
      {
        id: "1",
        totalNewestInteraction: 20,
        status: 1,
        targetUser: {
          id: "1",
          avatar: "1",
          firstName: "a",
          lastName: "b",
        },
      },
    ],
  },
};
