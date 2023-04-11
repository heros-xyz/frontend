import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectInterestedSport from ".";

const meta: Meta<typeof SelectInterestedSport> = {
  title: "Fan/On Boarding/SelectInterestedSport",
  component: SelectInterestedSport,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectInterestedSport>;

export const SelectInterestedSportComponent: Story = {
  render: (args) => (
    <Box h="100vh" bg="secondary">
      <SelectInterestedSport {...args} />
    </Box>
  ),
};
