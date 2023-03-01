import { HStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import ReadyToJoin from ".";
import { mock } from "./mock";

const meta: Meta<typeof ReadyToJoin> = {
  title: "Components/ReadyToJoin",
  component: ReadyToJoin,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ReadyToJoin>;

export const ReadyToJoinComponent: Story = {
  args: mock,
  render: (args) => (
    <HStack bg="primary" align={"center"} justify="center" padding={10}>
      <ReadyToJoin {...args} />
    </HStack>
  ),
};
