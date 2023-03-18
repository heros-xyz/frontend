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
      </Box>
    </Box>
  );
};
