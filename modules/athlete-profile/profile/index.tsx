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
import { useEffect, useMemo } from "react";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import MyStory from "@/components/ui/Athlete/Profile/MyStory";
import { getGender } from "@/utils/functions";
import { getEnvVariables } from "@/utils/env";
import { Nationality } from "@/libs/dtl/nationalities";

interface IProfileProps {
  basicInfo:
    | {
        nickName: string | undefined;
        dateOfBirth: string | Date | number | undefined;
        firstName: string | undefined;
        gender: string | number | undefined;
        middleName: string | undefined;
        nationality: Nationality | undefined;
        story: string | undefined;
      }
    | undefined;
  sportProfile:
    | {
        currentTeam: string | undefined;
        goal: string | undefined;
        sport:
          | {
              label: string;
              key: string;
            }
          | undefined;
      }
    | undefined;
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
  const { NEXTAUTH_URL } = getEnvVariables();

  const profileLink = useMemo(() => {
    const nickNameFormat = athleteNickname.replace(/\s+/g, "");
    return `${NEXTAUTH_URL}/${athleteId}/${nickNameFormat}`;
  }, [athleteId, athleteNickname]);

  const onClickCopy = () => {
    toast({
      title: "Profile Link Copied",
      status: "success",
      duration: 2000,
      position: "bottom",
    });
    onCopy();
  };

  useEffect(() => {
    if (profileLink) setValue(profileLink);
  }, [profileLink]);

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
        <Box mb="7" color="accent.2" bg="accent.1" px="6" py="4" rounded="lg">
          <Text fontWeight="bold" fontSize={{ base: "base", lg: "xl" }}>
            {sportProfile?.sport?.label || ""}
          </Text>
          <Text fontWeight="normal" fontSize={{ base: "xs", lg: "base" }}>
            {sportProfile?.currentTeam || ""}
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }} mb={2}>
            My Goal
          </Text>
          <Text fontSize={{ base: "xs", lg: "md" }} whiteSpace="break-spaces">
            {sportProfile?.goal || ""}
          </Text>
        </Box>

        <Box mt={6}>
          <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }} mb={1}>
            Profile Link
          </Text>
          <Text fontSize={{ base: "xs", lg: "md" }} textDecoration="none">
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
