import { Button, Container } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { FormikContext } from "formik";
import { store } from "@/store";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import PaymentForm from ".";

const meta: Meta<typeof PaymentForm> = {
  title: "Payment/PaymentForm",
  component: PaymentForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PaymentForm>;

export const AddPaymentComponent: Story = {
  render: (args) => {
    const { formik, isValid, submitCount, values, handleSubmit } =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      usePaymentForm();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isValid) console.log(values);
    }, [submitCount]);

    return (
      <Provider store={store}>
        <FormikContext.Provider value={formik}>
          <Container
            minH="100vh"
            bg="primary"
            size={["full", "sm", "md", "lg", "500px"]}
          >
            <PaymentForm {...args} title="Payment Information" />
            <Button mt={5} onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Container>
        </FormikContext.Provider>
      </Provider>
    );
  },
};
