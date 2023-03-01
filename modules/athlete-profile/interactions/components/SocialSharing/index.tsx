import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  CopyLinkIcon,
  FacebookIcon,
  TwitterIcon,
} from "@/components/svg/SocialSharingIcons";

interface ISocialSharingModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function SocialSharingModal({
  onClose,
  isOpen,
}: ISocialSharingModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        pt="40px"
        px="30px"
        pb={{ base: "26px", lg: "30px" }}
        maxW="unset"
        w={{ base: "344px", lg: "395px" }}
      >
        <Box fontWeight={700} fontSize="base" mb="10px">
          <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
            <FacebookIcon w="50px" h="50px" my="10px" />
            <Text ml="16px">Share to Facebook</Text>
          </Flex>
          <Divider />
          <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
            <TwitterIcon w="50px" h="50px" my="10px" />
            <Text ml="16px">Share to Twitter</Text>
          </Flex>
          <Divider />
          <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
            <CopyLinkIcon w="50px" h="50px" my="10px" />
            <Text ml="16px">Copy Link</Text>
          </Flex>
        </Box>

        <Button
          w="fit-content"
          alignSelf="center"
          variant="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalContent>
    </Modal>
  );
}
