import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { LockCloseIcon } from "@/components/svg/Settings";
import FanOnlyModal from "@/components/modal/FanOnlyModal";

const FanOnlySection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FanOnlyModal isOpen={isOpen} onClose={onClose} />

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
