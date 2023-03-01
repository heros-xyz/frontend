import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconProfileImage } from "@/components/svg/IconProfileImage";
import { UploadIcon } from "@/components/svg/UploadIcon";
import OnboardingWrapper from ".";

const meta: Meta<typeof OnboardingWrapper> = {
  title: "Components/OnboardingWrapper",
  component: OnboardingWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingWrapper>;

export const OnboardingWrapperComponent: Story = {
  render: (args) => (
    <OnboardingWrapper {...args}>
      <Box mb="7">
        <Box fontWeight="medium" mb="2.5">
          Upload Profile Image
        </Box>
        <Box fontWeight="normal" fontSize="xs">
          This is the first thing your fans see on your page. We recommend a
          portrait image of at least 340 x 450px.
        </Box>
      </Box>
    </OnboardingWrapper>
  ),
  args: {
    title: "Basic Information",
    Icon: <IconProfileImage />,
    IconButton: <UploadIcon />,
    textButton: "Upload image",
    footer: "Footer",
  },
};
