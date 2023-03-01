import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectGender from "./";

const meta: Meta<typeof SelectGender> = {
  title: "Fan/On Boarding/SelectGender",
  component: SelectGender,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectGender>;

export const SelectGenderComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <SelectGender {...args} />
    </Box>
  ),
};
