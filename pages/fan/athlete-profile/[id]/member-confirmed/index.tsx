import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MemberConfirmed from "@/components/ui/MemberConfirmed";
import { FanOnboardingSuccess } from "@/components/svg/FanOnboardingSuccess";
import { useGetBasicInformationQuery } from "@/api/athlete";

const MembershipConfirmed = () => {
  const router = useRouter();
  const { data: dataAthlete } = useGetBasicInformationQuery(
    router.query.id as string,
    {
      skip: typeof router.query.id !== "string",
    }
  );
  return (
    <Box bg="white" minH="100vh">
      <Container
        size={["base", "sm", "md", "lg", "xl"]}
        display="flex"
        alignItems="center"
        minH="100vh"
      >
        <MemberConfirmed
          textButton="back to athlete profile"
          Icon={<FanOnboardingSuccess w="full" h="full" />}
          title="Membership Confirmed"
          description={`You are now a fan of ${
            dataAthlete?.nickName ?? ""
          }! Get started by exploring the benefits that come with your membership.`}
          onConfirmed={() => {
            if (router.query.id as string) {
              router.push(`/fan/athlete-profile/${router.query.id}`);
            }
          }}
        />
      </Container>
    </Box>
  );
};

export default MembershipConfirmed;
