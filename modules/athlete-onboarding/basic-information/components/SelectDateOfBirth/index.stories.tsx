import type { Meta, StoryObj } from "@storybook/react";
import { Formik } from "formik";
import SelectDateOfBirth from ".";

const meta: Meta<typeof SelectDateOfBirth> = {
  title: "Athlete/PageInfo/SelectDateOfBirth",
  component: SelectDateOfBirth,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SelectDateOfBirth>;

export const SelectDateOfBirthStory: Story = {
  render: () => (
    <Formik onSubmit={console.log} initialValues={{ nationality: "" }}>
      <SelectDateOfBirth onSubmit={console.log} />
    </Formik>
  ),
};
