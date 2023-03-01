import { Box, Button, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "primaryBorder", "primaryOutline"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const WithVariant: Story = {
  render: (args) => <Button {...args}>Join with us</Button>,
  args: {
    variant: "primary",
  },
};

export const WithProps: Story = {
  render: (args) => (
    <Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Button</Text>
        <Button {...args} variant="primary">
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Outlined Button</Text>
        <Button {...args} variant="primaryOutline">
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Secondary Button</Text>
        <Button {...args} variant="secondary">
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Has Border Button</Text>
        <Button {...args} variant="primaryBorder">
          Join with us
        </Button>
      </Box>
    </Box>
  ),
};

export const WithCustomColor: Story = {
  render: (args) => (
    <Box>
      <Box m={6}>
        <Button {...args} colorScheme="teal">
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Button {...args} colorScheme="blue">
          Join with us
        </Button>
      </Box>
    </Box>
  ),
};

export const WithDisabled: Story = {
  render: (args) => (
    <Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Button</Text>
        <Button {...args} variant="primary" disabled>
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Outlined Button</Text>
        <Button {...args} variant="primaryOutline" disabled>
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Secondary Button</Text>
        <Button {...args} variant="secondary" disabled>
          Join with us
        </Button>
      </Box>
      <Box m={6}>
        <Text fontWeight={"bold"}>Primary Has Border Button</Text>
        <Button {...args} variant="primaryBorder" disabled>
          Join with us
        </Button>
      </Box>
    </Box>
  ),
};
