import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { useFormikContext } from "formik";
import { useRouter } from "next/router";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import EnterPost from "@/modules/athlete-interaction/components/post/EnterPost";
import ShareWith from "./ShareWith";
import { IValuesTypes } from "../../hooks";

interface IProps {
  handleSubmit: () => void;
  isLoading?: boolean;
}

const InteractionsPost: FC<IProps> = ({ isLoading, handleSubmit }) => {
  const router = useRouter();
  const { values, isValid } = useFormikContext<IValuesTypes>();

  const handleSubmits = () => {
    handleSubmit();
  };

  const disablePost = useMemo(() => {
    return !Boolean(values.content) || !isValid;
  }, [values, isValid]);

  return (
    <>
      <Flex justifyContent="space-between" py={6} zIndex={10}>
        <Flex
          alignItems="center"
          gap={3}
          cursor="pointer"
          onClick={() => router.push("/athlete/interactions")}
        >
          <ArrowLeft />
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", lg: "2xl" }}
            color="white"
          >
            Interaction
          </Text>
        </Flex>
        <Button
          bg="secondary"
          color="primary"
          fontFamily="heading"
          fontSize={{ lg: "xl" }}
          isDisabled={disablePost}
          _disabled={{
            bg: "grey.100",
            pointerEvents: "none",
          }}
          isLoading={isLoading}
          onClick={handleSubmits}
        >
          Post
        </Button>
      </Flex>
      <Box>
        <EnterPost />
        <Box py={{ base: 4, lg: 8 }}>
          <ShareWith />
        </Box>
      </Box>
    </>
  );
};

export default InteractionsPost;
