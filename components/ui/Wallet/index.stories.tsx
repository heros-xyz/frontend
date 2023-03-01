import type {Meta, StoryObj} from "@storybook/react";
import Wallet from "./index";

const meta: Meta<typeof Wallet> = {
    title: "Athlete/Wallet",
    component: Wallet,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
        argTypes: {
            buttonContent: {
                if: {arg: "havePaymentMethod", truthy: false}
            },
        },
};

export default meta;
type Story = StoryObj<typeof Wallet>;

export const WalletTemplate: Story = {
    args: {
        title: "Wallet",
        currentMoney: 4.5,
        feePrice: 5,
        timeReceive: "12/12/2022",
        havePaymentMethod: true,
        buttonContent: "Add Payment Method"
    },
};
