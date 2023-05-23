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
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { DeletePostIcon } from "@/components/svg/DeletePost";
import { DeletePostMobileIcon } from "@/components/svg/DeletePostMobile";
import { db } from "@/libs/firebase";
import { Post } from "@/libs/dtl/post";
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
      const postDocRef = doc(db, "post", postId);
      const postDocData = (await getDoc(postDocRef)).data() as Post;

      const makerRef = doc(db, `athleteProfile/${postDocData?.uid}`);
      const makerData = (await getDoc(makerRef)).data();
      const count = makerData?.totalInteractionCount - 1;
      await updateDoc(makerRef, { totalInteractionCount: count });

      await deleteDoc(postDocRef);
      onDeleted();
      onClose();
      router.push("/athlete/interactions");
    } catch (error) {
      console.log({ error });
    }
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
