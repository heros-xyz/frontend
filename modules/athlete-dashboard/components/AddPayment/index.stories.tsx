import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AddPayment from ".";

const meta: Meta<typeof AddPayment> = {
  title: "Athlete/AddPayment",
  component: AddPayment,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AddPayment>;

export const AddPaymentComponent: Story = {
  render: (args) => (
    <Provider store={store}>
      <Box minH="100vh" bg="primary">
        <AddPayment {...args} />
      </Box>
    </Provider>
  ),
};
