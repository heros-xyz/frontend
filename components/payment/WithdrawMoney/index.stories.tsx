import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store";
import WithdrawMoney from ".";

const meta: Meta<typeof WithdrawMoney> = {
  title: "Payment/WithdrawMoney",
  component: WithdrawMoney,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof WithdrawMoney>;

export const WithdrawMoneyComponent: Story = {
  render: (args) => (
    <Provider store={store}>
      <Box minH="100vh" bg="primary">
        <WithdrawMoney {...args} />
      </Box>
    </Provider>
  ),
};
