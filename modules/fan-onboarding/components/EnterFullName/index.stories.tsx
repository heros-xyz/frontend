import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import EnterFullName from ".";

const meta: Meta<typeof EnterFullName> = {
  title: "Fan/On Boarding/EnterFullName",
  component: EnterFullName,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof EnterFullName>;

export const EnterFullNameComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <EnterFullName {...args} />
    </Box>
  ),
};
