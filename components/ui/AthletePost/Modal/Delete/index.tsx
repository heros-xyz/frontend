import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { DeletePostIcon } from "@/components/svg/DeletePost";
import { DeletePostMobileIcon } from "@/components/svg/DeletePostMobile";
import { db } from "@/libs/firebase";
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
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      await deleteDoc(doc(db, "post", postId));
      onDeleted();
      onClose();
      router.push("/athlete/interactions");
    } catch (error) {}
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
          textColor="black.primary"
        >
          This action cannot be undone. Are you sure you want to delete this
          interaction?
        </Text>
        <Box w="full">
          <Button
            variant="primary"
            mb={{ base: 4, lg: 7 }}
            fontSize={{ lg: "xl" }}
            onClick={handleDeletePost}
            bg="secondary"
            color="primary"
            size="lg"
            w={{ base: "full", lg: "fit-content" }}
          >
            yes, delete Interaction
          </Button>
          <Text
            role="button"
            fontWeight={500}
            fontSize={{ base: "sm", lg: "lg" }}
            textDecoration="underline"
            textColor="primary"
            onClick={onClose}
            color="grey.300"
          >
            Cancel
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default DeletePostModal;
