import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import AddTier from ".";

const meta: Meta<typeof AddTier> = {
  title: "Athlete/AddTier",
  component: AddTier,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AddTier>;

export const AddTierComponent: Story = {
  render: (args) => (
    <Box minH="100vh" bg="primary">
      <AddTier {...args} />
    </Box>
  ),
};
