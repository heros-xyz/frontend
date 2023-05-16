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
import { useEffect, useMemo } from "react";
import { CopyLinkIcon } from "@/components/svg/SocialSharingIcons";
import { getEnvVariables } from "@/utils/env";
import { useDevice } from "@/hooks/useDevice";

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
  const { isMobile } = useDevice();
  const { NEXTAUTH_URL } = getEnvVariables();
  const toast = useToast();

  const postLink = useMemo(() => {
    return `${NEXTAUTH_URL}/fan/athlete-profile/${athleteId}/interaction?view=${postId}`;
  }, [postId, athleteId]);

  const onShare = () => {
    if (isMobile) {
      const shareData = {
        title: `Share interaction`,
        url: postLink,
      };

      navigator.share(shareData).then(onClose);
      return;
    }
    onCopy();
    toast({
      title: "Copied Link",
      status: "success",
      duration: 2000,
    });
    onClose();
  };

  useEffect(() => {
    setValue(postLink);
  }, []);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent
        pt="15px"
        px="30px"
        pb={{ base: "20px", lg: "25px" }}
        maxW="unset"
        w={{ base: "344px", lg: "395px" }}
      >
        <Box fontWeight={700} fontSize="base" mb="10px">
          {/* <FacebookShareButton url={postLink} onClick={onClose}>
            <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
              <FacebookIcon w="50px" h="50px" my="10px" />
              <Text color="primary" ml="16px">
                Share to Facebook
              </Text>
            </Flex>
          </FacebookShareButton>
          <Divider borderColor="#DDDDDD" />
          <TwitterShareButton url={postLink} onClick={onClose}>
            <Flex role="button" _hover={{ opacity: 0.5 }} alignItems="center">
              <TwitterIcon w="50px" h="50px" my="10px" />
              <Text color="primary" ml="16px">
                Share to Twitter
              </Text>
            </Flex>
          </TwitterShareButton> */}
          <Flex
            role="button"
            _hover={{ opacity: 0.5 }}
            alignItems="center"
            onClick={onShare}
          >
            <CopyLinkIcon w="50px" h="50px" my="10px" />
            <Text color="primary" ml="16px">
              Share to friends
            </Text>
          </Flex>
        </Box>

        <Button w="full" alignSelf="center" variant="primary" onClick={onClose}>
          Cancel
        </Button>
      </ModalContent>
    </Modal>
  );
}
