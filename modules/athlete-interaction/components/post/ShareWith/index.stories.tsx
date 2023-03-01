import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormikContext } from "formik";
import React from "react";
import ShareWith from ".";
import { useInteractionInfo } from "../../../hooks";
const meta: Meta<typeof ShareWith> = {
  title: "Athlete/Interaction/ShareWith",
  component: ShareWith,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof ShareWith>;

const ShareWithComponent: React.FC = () => {
  const { formik } = useInteractionInfo();
  return (
    <Box bg="primary" p={4}>
      <FormikContext.Provider value={formik}>
        <ShareWith />
      </FormikContext.Provider>
    </Box>
  );
};

export const ShareWithStory: Story = {
  render: () => <ShareWithComponent />,
};
