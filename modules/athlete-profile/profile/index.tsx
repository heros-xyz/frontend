import {
  Box,
  Button,
  Flex,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import MyStory from "@/components/ui/Athlete/Profile/MyStory";
import { getGender } from "@/utils/functions";
import { IBasicInfo, ISportProfile } from "@/types/athlete/types";
import { useDevice } from "@/hooks/useDevice";

interface IProfileProps {
  basicInfo: IBasicInfo | undefined;
  sportProfile: ISportProfile | undefined;
  isEdit?: boolean;
  athleteId: string;
  athleteNickname: string;
}

export const Profile: React.FC<IProfileProps> = ({
  basicInfo,
  sportProfile,
  isEdit,
  athleteId,
  athleteNickname,
}) => {
  const router = useRouter();
  const { onCopy, setValue } = useClipboard("");
  const toast = useToast();
  const { isMobile } = useDevice();

  const profileLink = useMemo(() => {
    const link = `${process.env.NEXTAUTH_URL}/${athleteId}/${athleteNickname}`;
    setValue(link);
    return `${process.env.NEXTAUTH_URL}/${athleteId}/${athleteNickname}`;
  }, [athleteId, athleteNickname]);

  const onClickCopy = () => {
    // if (isMobile) {
    //   const shareData = {
    //     title: `${athleteNickname}'s Profile Link`,
    //     url: profileLink,
    //   };

    //   navigator.share(shareData);
    // }

    toast({
      title: "Profile Copied Link",
      status: "success",
      duration: 2000,
      position: isMobile ? "bottom" : "bottom-right",
    });
    onCopy();
  };

  return (
    <Box pb={5}>
      <Box color="primary" bg="accent.3">
        <MyStory
          description={basicInfo?.story as string}
          dob={dayjs(basicInfo?.dateOfBirth).format("DD MMM YYYY")}
          gender={getGender(basicInfo?.gender)}
          isEdit={isEdit}
        />
      </Box>
      <Box px={{ base: "20px", xl: 0 }} pt="10" h="full" color="primary">
        <Flex justifyContent="space-between" mb="5">
          <Text
            color="primary"
            fontWeight="bold"
            fontSize={{ base: "base", lg: "xl" }}
          >
            Sport Profile
          </Text>
          {isEdit && (
            <EditIcon
              cursor="pointer"
              color="primary"
              onClick={() => {
                router.push("/athlete/my-profile/edit-sport-profile");
              }}
            />
          )}
        </Flex>
        <Box mb="7" color="primary" bg="accent.1" px="6" py="4" rounded="lg">
          <Text fontWeight="bold" fontSize={{ base: "base", lg: "xl" }}>
            {sportProfile?.data?.sportProfilesItems[0]?.sportName || ""}
          </Text>
          <Text fontWeight="normal" fontSize={{ base: "xs", lg: "base" }}>
            {sportProfile?.data.currentTeam || ""}
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }} mb={2}>
            My Goal
          </Text>
          <Text fontSize={{ base: "xs", lg: "md" }}>
            {sportProfile?.data.goal || ""}
          </Text>
        </Box>

        <Box mt={6}>
          <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }} mb={1}>
            Profile Link
          </Text>
          <Text fontSize={{ base: "xs", lg: "md" }} textDecoration="underline">
            {profileLink}
          </Text>
          <Button
            mt={3}
            variant="primary"
            w={{ base: "full", lg: "fit-content" }}
            onClick={onClickCopy}
          >
            Copy link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
