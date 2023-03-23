import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { useFormikContext } from "formik";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import EnterPost from "@/modules/athlete-interaction/components/post/EnterPost";
import ShareWith from "./ShareWith";
import { IValuesTypes } from "../../hooks";

interface IProps {
  isEdit?: boolean;
  isLoading?: boolean;
  handleSubmit: () => void;
  onBack?: () => void;
}

const InteractionsPost: FC<IProps> = ({
  isEdit,
  isLoading,
  handleSubmit,
  onBack,
}) => {
  const { values, isValid } = useFormikContext<IValuesTypes>();

  const handleSubmits = () => {
    handleSubmit();
  };

  const disablePost = useMemo(() => {
    return (
      (!Boolean(values.content) && !Boolean(values.listMedia.length)) ||
      !isValid
    );
  }, [values, isValid]);

  return (
    <>
      <Flex justifyContent="space-between" py={6} zIndex={10}>
        <Flex
          alignItems="center"
          gap={3}
          cursor="pointer"
          onClick={() => onBack && onBack()}
        >
          <ArrowLeft />
          <Text
            fontFamily="heading"
            fontWeight={700}
            fontSize={{ base: "xl", lg: "2xl" }}
            color="primary"
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
            color: "grey.300",
          }}
          isLoading={isLoading}
          onClick={handleSubmits}
        >
          {isEdit ? "Update" : "Post"}
        </Button>
      </Flex>
      <Box>
        <EnterPost />
        <Box py={{ base: 4, lg: 8 }}>
          <ShareWith isDisabled={isEdit} />
        </Box>
      </Box>
    </>
  );
};

export default InteractionsPost;
