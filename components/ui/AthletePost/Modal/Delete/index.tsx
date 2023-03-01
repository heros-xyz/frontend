import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import { DeletePostIcon } from "@/components/svg/DeletePost";
import { useDeletePostInteractionMutation } from "@/api/athlete";
import { DeletePostMobileIcon } from "@/components/svg/DeletePostMobile";
interface IDeletePostModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

const DeletePostModal: FC<IDeletePostModalProps> = ({
  postId,
  isOpen,
  onClose,
  onDeleted,
}) => {
  const [submit, data] = useDeletePostInteractionMutation();
  const router = useRouter();

  useUpdateEffect(() => {
    if (data.isSuccess) {
      onDeleted();
      onClose();
      router.push("/athlete/interactions");
    }
  }, [data]);

  const handleDeletePost = () => {
    submit(postId as string);
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={{ lg: "50%" }}
        mx={5}
        px={4}
        py={5}
        textAlign="center"
      >
        <DeletePostIcon
          display={{ base: "none", lg: "block" }}
          mb={{ base: 3, lg: 5 }}
        />
        <DeletePostMobileIcon
          display={{ base: "block", lg: "none" }}
          mb={{ base: 3, lg: 5 }}
        />
        <Text
          px={{ lg: "10%" }}
          fontSize={{ base: "lg", lg: "xl" }}
          mb={{ base: 5, lg: 8 }}
        >
          This action cannot be undone. Are you sure you want to delete this
          interaction?
        </Text>
        <Box>
          <Button
            variant="primary"
            mb={{ base: 4, lg: 7 }}
            fontSize={{ lg: "xl" }}
            onClick={handleDeletePost}
          >
            yes, delete Interaction
          </Button>
          <Text
            role="button"
            fontWeight={500}
            fontSize={{ base: "sm", lg: "lg" }}
            textDecoration="underline"
            onClick={onClose}
          >
            Cancel
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default DeletePostModal;
