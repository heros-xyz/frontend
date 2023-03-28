import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Else, If, Then } from "react-if";
import { AlertIcon } from "@/components/svg/Alert";
import { CheckIcon } from "@/components/svg/CheckIcon";

interface DeleteProps {
  title?: string;
  message: string;
  confirm: string;
  cancel?: string;
  onCancel?: () => void;
  onSubmit: () => void;
  alert?: string;
  name?: string;
  success?: boolean;
  isLoading?: boolean;
}
const DeleteSubscription: React.FC<DeleteProps> = ({
  title,
  message,
  confirm,
  cancel,
  alert,
  name,
  success,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  return (
    <Box bg="white" minH={50} borderRadius={8} zIndex="1">
      <Center mb={3}>
        <Center
          bg={success ? "#D1FAE5" : "#FEE2E2"}
          w={{ base: "12", xl: "20" }}
          h={{ base: "12", xl: "20" }}
          borderRadius="full"
        >
          <If condition={success}>
            <Then>
              <CheckIcon
                color="#52C152"
                w={{ base: "20px", xl: "30px" }}
                h={{ base: "18px", xl: "26px" }}
              />
            </Then>
            <Else>
              <AlertIcon
                w={{ base: "20px", xl: "30px" }}
                h={{ base: "18px", xl: "26px" }}
              />
            </Else>
          </If>
        </Center>
      </Center>
      <If condition={title}>
        <Then>
          <Box
            mb={1}
            fontWeight="semibold"
            textAlign="center"
            color="grey.500"
            fontSize={{ base: "lg", xl: "2xl" }}
          >
            {title}
          </Box>
        </Then>
      </If>
      <Box
        textAlign="center"
        color={"black.primary"}
        fontSize={{ base: "lg", xl: success ? "2xl" : "xl" }}
      >
        <If condition={name}>
          <Then>
            <Text as="b">{name}</Text>
            <Text as="span">{message}</Text>
          </Then>
          <Else>
            <Text
              fontWeight={success ? { base: "bold", xl: "semibold" } : "bold"}
            >
              {message}
            </Text>
          </Else>
        </If>
      </Box>
      <If condition={alert}>
        <Then>
          <Box
            mt={2}
            textAlign="center"
            color={"#FD2D55"}
            fontSize={{ base: "md", xl: "xl" }}
          >
            {alert}
          </Box>
        </Then>
      </If>
      <Center>
        <Button
          variant="primary"
          bg={success ? "primary" : "secondary"}
          color={success ? "secondary" : "primary"}
          mt={5}
          textTransform="uppercase"
          fontSize={{ base: "md", xl: "xl" }}
          fontWeight="bold"
          w={{ base: "100%", xl: "auto" }}
          h="auto"
          py={3}
          height="48px"
          isLoading={isLoading}
          onClick={onSubmit}
        >
          {confirm}
        </Button>
      </Center>
      <If condition={cancel}>
        <Then>
          <Center>
            <Button
              mt={2}
              variant="ghost"
              onClick={onCancel}
              _hover={{}}
              _active={{}}
            >
              <Text
                as="u"
                textTransform="capitalize"
                fontSize={{ base: "sm", xl: "lg" }}
                fontWeight="medium"
                color="grey.300"
              >
                {cancel}
              </Text>
            </Button>
          </Center>
        </Then>
      </If>
    </Box>
  );
};

export default DeleteSubscription;
