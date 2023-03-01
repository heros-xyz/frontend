import { Box, Flex } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import DateSelect from ".";

const meta: Meta<typeof DateSelect> = {
  title: "Components/DateSelect",
  component: DateSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    submitted: {
      options: [true, false],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateSelect>;

export const DateSelectStory: Story = {
  render: (args) => (
    <Box p={10} bg="secondary">
      <Flex justifyContent={"space-between"}>
        <DateSelect {...args} />
      </Flex>
    </Box>
  ),
  args: {
    format: "DD/MM/YYYY",
  },
};
