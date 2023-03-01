import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import FinishOnboarding from ".";

const meta: Meta<typeof FinishOnboarding> = {
  title: "Fan/On Boarding/FinishOnboarding",
  component: FinishOnboarding,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FinishOnboarding>;

export const FinishOnboardingComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <FinishOnboarding />
    </Box>
  ),
};
