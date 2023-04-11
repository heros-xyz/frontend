import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectProfileImage from ".";

const meta: Meta<typeof SelectProfileImage> = {
  title: "Fan/On Boarding/SelectProfileImage",
  component: SelectProfileImage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectProfileImage>;

export const SelectProfileImageComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <SelectProfileImage {...args} />
    </Box>
  ),
};
