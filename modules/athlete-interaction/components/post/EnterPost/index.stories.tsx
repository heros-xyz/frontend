import type { Meta, StoryObj } from "@storybook/react";
import { FormikContext } from "formik";
import React from "react";
import EnterPost from ".";
import { useInteractionInfo } from "../../../hooks";
const meta: Meta<typeof EnterPost> = {
  title: "Athlete/Interaction/EnterPost",
  component: EnterPost,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof EnterPost>;

const EnterPostComponent: React.FC = () => {
  const { formik } = useInteractionInfo();
  return (
    <FormikContext.Provider value={formik}>
      <EnterPost />
    </FormikContext.Provider>
  );
};

export const EnterPostStory: Story = {
  render: () => <EnterPostComponent />,
};
