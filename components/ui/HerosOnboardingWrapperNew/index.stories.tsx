import { Box } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconOnboarding } from "@/components/svg/IconOnboarding";
import { UploadIcon } from "@/components/svg/UploadIcon";
import HerosOnboardingWrapper from ".";

const meta: Meta<typeof HerosOnboardingWrapper> = {
  title: "Components/HerosOnboardingWrapper",
  component: HerosOnboardingWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HerosOnboardingWrapper>;

export const HerosOnboardingWrapperComponent: Story = {
  render: (args) => (
    <HerosOnboardingWrapper {...args}>
      <Box mb="7">
        <Box fontWeight="medium" mb="2.5">
          Upload Profile Image
        </Box>
        <Box fontWeight="normal" fontSize="xs">
          This is the first thing your fans see on your page. We recommend
        </Box>
      </Box>
    </HerosOnboardingWrapper>
  ),
  args: {
    title: "Basic Information",
    Icon: <IconOnboarding w="full" h="full" />,
    IconButton: <UploadIcon />,
    textButton: "Upload image",
    footer: "Footer",
  },
};
