import { Box } from "@chakra-ui/react";
import type { Meta } from "@storybook/react";
import { IconArrowRight } from "@/components/svg/IconArrowRight";
import FileUpload from ".";

const meta: Meta<typeof FileUpload> = {
  title: "Fan/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;

export const StepComponent = {
  render: (args: any) => (
    <Box p={5} bg="secondary">
      <FileUpload
        {...args}
        text="File upload"
        icon={<IconArrowRight />}
        onChange={() => {}}
      />
    </Box>
  ),
};
