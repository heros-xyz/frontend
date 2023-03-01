import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import Step from ".";

const meta: Meta<typeof Step> = {
  title: "Components/Step",
  component: Step,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    activeStep: {
      defaultValue: 3,
      options: [1, 2, 3, 4, 5],
      control: { type: "select" },
    },
    totalStep: {
      defaultValue: 5,
      options: [1, 2, 3, 4, 5],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Step>;

export const StepComponent: Story = {
  render: (args) => (
    <Box p={5} bg="secondary">
      <Step {...args} />
    </Box>
  ),
};
