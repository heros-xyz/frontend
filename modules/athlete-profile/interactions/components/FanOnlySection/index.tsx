import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ExclamationIcon from "@/components/svg/Exclamation";
import { LockCloseIcon } from "@/components/svg/Settings";

const FanOnlySection = () => {
  const [_, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
              color="#1D1D1D"
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
              variant="secondary"
              w={{ base: "312px", lg: "137px" }}
              mb={{ base: "15px", lg: "25px" }}
              onClick={() => {
                onClose();
                if (session) {
                  setCurrentTab(3);
                  return;
                }

                router.push("/sign-in");
              }}
            >
              JOIN NOW
            </Button>
            <Button
              color="#797979"
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
        bg="accent.1"
        gap="10px"
        color="accent.2"
        w="full"
      >
        <Text> FANS ONLY </Text>
        <LockCloseIcon />
      </Button>
    </>
  );
};

export default FanOnlySection;
