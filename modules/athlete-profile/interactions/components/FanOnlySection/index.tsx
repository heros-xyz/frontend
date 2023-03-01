import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ExclamationIcon from "@/components/svg/Exclamation";
import { LockCloseIcon } from "@/components/svg/Settings";

const FanOnlySection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          pt="20px"
          pb={{ base: "26px", lg: "30px" }}
          maxW="unset"
          w={{ base: "344px", lg: "740px" }}
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <ExclamationIcon
              w={{ base: "48px", lg: "80px" }}
              h={{ base: "48px", lg: "80px" }}
              mb={{ base: "15px", lg: "20px" }}
            />
            <Text
              fontWeight="medium"
              fontSize={{ base: "lg", lg: "2xl" }}
              mb="5px"
            >
              Restricted to fans only
            </Text>
            <Text
              fontWeight="normal"
              fontSize={{ base: "base", lg: "xl" }}
              mb={{ base: "20px", lg: "30px" }}
            >
              Please subscribe to view all content from your favorite athlete.
            </Text>
            <Button
              size="lg"
              variant="primary"
              w={{ base: "312px", lg: "137px" }}
              mb={{ base: "15px", lg: "25px" }}
            >
              JOIN NOW
            </Button>
            <Button
              onClick={onClose}
              textDecoration="underline"
              variant="link"
              textTransform="unset"
            >
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      <Button
        size="lg"
        onClick={onOpen}
        bg="secondary"
        gap="10px"
        color="black"
        w="full"
      >
        <Text> FANS ONLY </Text>
        <LockCloseIcon />
      </Button>
    </>
  );
};

export default FanOnlySection;
