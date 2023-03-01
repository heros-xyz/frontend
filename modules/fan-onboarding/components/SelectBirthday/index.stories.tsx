import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectBirthday from "./";

const meta: Meta<typeof SelectBirthday> = {
  title: "Fan/On Boarding/SelectBirthday",
  component: SelectBirthday,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectBirthday>;

export const SelectBirthdayComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <SelectBirthday {...args} />
    </Box>
  ),
};
