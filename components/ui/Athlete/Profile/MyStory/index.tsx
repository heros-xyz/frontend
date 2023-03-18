import React, { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  Center,
  Link,
} from "@chakra-ui/react";
import { If, Then } from "react-if";
import NextLink from "next/link";
import { EditIcon } from "@/components/svg/menu/EditIcon";
interface Story {
  description: string;
  dob: string;
  gender: string;
  isEdit?: boolean;
}
const MyStory: React.FC<Story> = ({ description, dob, gender, isEdit }) => {
  const [readMore, setReadMore] = useState(false);

  const descSubstring = useMemo(() => {
    return description?.substring(0, 200);
  }, [description]);

  const showReadMore = useMemo(() => {
    return description?.length > 200 && !readMore;
  }, [description, readMore]);

  return (
    <Box
      pb={5}
      bg="accent.3"
      color="primary"
      px={5}
      py={10}
      pt={5}
      borderRadius={{ xl: "12px" }}
    >
      {isEdit && (
        <Box textAlign="right">
          <Link as={NextLink} href={"/athlete/my-profile/edit-basic-info"}>
            <EditIcon cursor="pointer" />
          </Link>
        </Box>
      )}
      <Heading fontSize="xl">My Story</Heading>
      <Box fontSize={{ base: "xs", lg: "md" }} mt={2.5} wordBreak="break-word">
        <Text as="span">
          {readMore ? description : descSubstring}
          {showReadMore ? "...." : ""}
        </Text>
        <If condition={showReadMore}>
          <Then>
            <Text
              as="span"
              fontWeight={800}
              textDecoration="underline"
              ml={1}
              cursor="pointer"
              onClick={() => setReadMore(true)}
            >
              Read more
            </Text>
          </Then>
        </If>
      </Box>

      <Flex mt={7} justifyContent="space-between" alignItems="start">
        <Flex direction="column" w="40%">
          <Text fontSize="xs" fontWeight="medium">
            Date of Birth
          </Text>
          <Text fontSize="xl" textTransform={"uppercase"} fontWeight={"bold"}>
            {dob}
          </Text>
        </Flex>
        <Center height="50px">
          <Divider orientation="vertical" borderLeftColor="grey.dark" />
        </Center>
        <Flex direction="column" w="40%">
          <Text fontSize="xs" fontWeight="medium">
            Gender
          </Text>
          <Text fontSize="xl" textTransform={"uppercase"} fontWeight={"bold"}>
            {gender}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MyStory;
