import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import ChangePayment from ".";

const meta: Meta<typeof ChangePayment> = {
  title: "Fan/ChangePayment",
  component: ChangePayment,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ChangePayment>;

export const AddPaymentComponent: Story = {
  render: (args) => (
    <Provider store={store}>
      <Box minH="100vh" bg="primary">
        <ChangePayment {...args} idUpdate="" />
      </Box>
    </Provider>
  ),
};

export const ChangePaymentComponent: Story = {
  render: (args) => (
    <Provider store={store}>
      <Box minH="100vh" bg="primary">
        <ChangePayment {...args} idUpdate="" />
      </Box>
    </Provider>
  ),
};
