import type { Meta, StoryObj } from "@storybook/react";
import { Formik } from "formik";
import { Provider } from "react-redux";
import { store } from "@/store";
import SelectNationality from ".";

const meta: Meta<typeof SelectNationality> = {
  title: "Athlete/PageInfo/SelectNationality",
  component: SelectNationality,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectNationality>;

export const SelectNationalityStory: Story = {
  render: () => (
    <Provider store={store}>
      <Formik onSubmit={console.log} initialValues={{ nationality: "" }}>
        <SelectNationality onSubmit={console.log} />
      </Formik>
    </Provider>
  ),
};
