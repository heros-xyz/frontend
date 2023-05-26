import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import ExclamationIcon from "@/components/svg/Exclamation";
import { useAuthContext } from "@/context/AuthContext";

interface FanOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickDownButton?: () => void;
}
const FanOnlyModal: React.FC<FanOnlyModalProps> = ({
  isOpen,
  onClose,
  onClickDownButton,
}) => {
  const { user } = useAuthContext();
  const [, setCurrentTab] = useQueryParam(
    "current",
    withDefault(NumberParam, 0)
  );
  const router = useRouter();

  return (
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
              if (user?.uid) {
                setCurrentTab(3);
                onClickDownButton && onClickDownButton();
                return;
              }

              router.push({
                pathname: "/sign-in",
                query: {
                  callbackUrl: location.href,
                },
              });
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
  );
};

export default FanOnlyModal;
