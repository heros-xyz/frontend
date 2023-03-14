import { Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import MyStory from "@/components/ui/Athlete/Profile/MyStory";
import { getGender } from "@/utils/functions";
import { IBasicInfo, ISportProfile } from "@/types/athlete/types";

interface IProfileProps {
  basicInfo: IBasicInfo | undefined;
  sportProfile: ISportProfile | undefined;
  isEdit?: boolean;
}

export const Profile: React.FC<IProfileProps> = ({
  basicInfo,
  sportProfile,
  isEdit,
}) => {
  const router = useRouter();
  return (
    <Box>
      <Box color="primary">
        <MyStory
          description={basicInfo?.story as string}
          dob={dayjs(basicInfo?.dateOfBirth).format("DD MMM YYYY")}
          gender={getGender(basicInfo?.gender)}
          isEdit={isEdit}
        />
      </Box>
      <Box px={{ base: "20px", xl: 0 }} pt="10" h="full">
        <Flex justifyContent="space-between" mb="5">
          <Text
            color="acccent.3"
            fontWeight="bold"
            fontSize={{ base: "base", lg: "xl" }}
          >
            Sport Profile
          </Text>
          {isEdit && (
            <EditIcon
              cursor="pointer"
              onClick={() => {
                router.push("/athlete/my-profile/edit-sport-profile");
              }}
            />
          )}
        </Flex>
        <Box mb="7 " bg="acccent.1" px="6" py="4" rounded="lg">
          <Text
            color="acccent.2"
            fontWeight="bold"
            fontSize={{ base: "base", lg: "xl" }}
          >
            {sportProfile?.data?.sportProfilesItems[0]?.sportName || ""}
          </Text>
          <Text
            color="primary"
            fontWeight="normal"
            fontSize={{ base: "xs", lg: "base" }}
          >
            {sportProfile?.data.currentTeam || ""}
          </Text>
        </Box>

        <Text fontWeight="bold" mb="2.5" fontSize={{ base: "sm", lg: "md" }}>
          My Goal
        </Text>
        <Text fontWeight="normal" fontSize={{ base: "xs", lg: "md" }}>
          {sportProfile?.data.goal || ""}
        </Text>
      </Box>
    </Box>
  );
};
