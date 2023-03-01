import { Box, Container } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./index";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectComponent: Story = {
  render: (args) => (
    <Container>
      <Box p={8} bg="secondary">
        <Select {...args} />
      </Box>
    </Container>
  ),
  args: {
    placeHolder: "Select",
    size: "medium",
    isMulti: false,
    optionCount: 4,
    options: [
      {
        value: "Football",
        label: "Football",
      },
      {
        value: "Basketball",
        label: "Basketball",
      },
      {
        value: "Badminton",
        label: "Badminton",
      },
      {
        value: "Cricket",
        label: "Cricket",
      },
      {
        value: "Swimming",
        label: "Swimming",
      },
      {
        value: "Tennis",
        label: "Tennis",
      },
      {
        value: "Baseball",
        label: "Baseball",
      },
      {
        value: "Running",
        label: "Running",
      },
      {
        value: "Flexing",
        label: "Flexing",
      },
    ],
  },
};
