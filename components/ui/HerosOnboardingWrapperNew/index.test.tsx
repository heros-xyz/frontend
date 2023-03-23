import { Box } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { IconOnboarding } from "@/components/svg/IconOnboarding";
import { UploadIcon } from "@/components/svg/UploadIcon";
import OnboardingWrapper from ".";

it("renders homepage unchanged", () => {
  const { container } = render(
    <OnboardingWrapper
      title="hehe"
      Icon={<IconOnboarding />}
      IconButton={<UploadIcon />}
      textButton="huhu"
      footer="Footer"
    >
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
  );
  expect(container).toMatchSnapshot();
});
