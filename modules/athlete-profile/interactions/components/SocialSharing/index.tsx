import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useEffect, useMemo } from "react";
import {
  CopyLinkIcon,
  FacebookIcon,
  TwitterIcon,
} from "@/components/svg/SocialSharingIcons";
import { getEnvVariables } from "@/utils/env";

interface ISocialSharingModalProps {
  onClose: () => void;
  postId: string;
  athleteId: string;
  isOpen: boolean;
}

export default function SocialSharing({
  postId,
  athleteId,
  isOpen,
  onClose,
}: ISocialSharingModalProps) {
  const { onCopy, setValue } = useClipboard("");
  const { NEXTAUTH_URL } = getEnvVariables();
  const toast = useToast();

  const postLink = useMemo(() => {
    return `${NEXTAUTH_URL}/fan/athlete-profile/${athleteId}/interaction?view=${postId}`;
  }, [postId, athleteId]);

  useEffect(() => {
    setValue(postLink);
  }, []);

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
          <FacebookShareButton
            url={postLink}
            title={"postDetails.content"}
            hashtag="#PostDetail"
            onClick={onClose}
          >
            <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
              <FacebookIcon w="50px" h="50px" my="10px" />
              <Text ml="16px">Share to Facebook</Text>
            </Flex>
          </FacebookShareButton>
          <Divider />
          <TwitterShareButton
            url={postLink}
            title={"ostDetails.content"}
            onClick={onClose}
          >
            <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
              <TwitterIcon w="50px" h="50px" my="10px" />
              <Text ml="16px">Share to Twitter</Text>
            </Flex>
          </TwitterShareButton>
          <Divider />
          <Flex
            role="button"
            _hover={{ opacity: 0.5 }}
            alignItems="center"
            onClick={() => {
              onCopy();
              toast({
                title: "Copied Link",
                status: "success",
                duration: 2000,
              });
              onClose();
            }}
          >
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
