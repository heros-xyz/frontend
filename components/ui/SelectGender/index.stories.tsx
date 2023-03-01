import { HStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import SelectGender from ".";

const meta: Meta<typeof SelectGender> = {
  title: "Components/SelectGender",
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
    <HStack bg="primary" align={"center"} justify="center" padding={10}>
      <SelectGender {...args} />
    </HStack>
  ),
};
