import type { Meta, StoryObj } from "@storybook/react";
import { Formik } from "formik";
import InputYourStory from ".";

const meta: Meta<typeof InputYourStory> = {
  title: "Athlete/PageInfo/YourStory",
  component: InputYourStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof InputYourStory>;

export const InputYourStoryStory: Story = {
  render: () => (
    <Formik onSubmit={console.log} initialValues={{ nationality: "" }}>
      <InputYourStory onSubmit={console.log} />
    </Formik>
  ),
};
