import type { Meta, StoryObj } from "@storybook/react";
import { Formik, FormikContext } from "formik";
import AthleteSelectGender from ".";

const meta: Meta<typeof AthleteSelectGender> = {
  title: "Athlete/PageInfo/SelectGender",
  component: AthleteSelectGender,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AthleteSelectGender>;

export const AthleteSelectGenderStory: Story = {
  render: () => (
    <Formik onSubmit={console.log} initialValues={{ nationality: "" }}>
      {(formik) => (
        <FormikContext.Provider value={formik}>
          <AthleteSelectGender onSubmit={console.log} />
        </FormikContext.Provider>
      )}
    </Formik>
  ),
};
