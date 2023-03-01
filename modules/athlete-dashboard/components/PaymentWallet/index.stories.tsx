import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import Payment from ".";

const meta: Meta<typeof Payment> = {
  title: "Athlete/Payment",
  component: Payment,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Payment>;

export const PaymentComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="primary">
      <Payment {...args} />
    </Box>
  ),
};
