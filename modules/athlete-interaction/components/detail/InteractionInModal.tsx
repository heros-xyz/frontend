import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useListener, useBus } from "react-bus";
import { If, Then } from "react-if";
import InteractionDetail from ".";

interface InteractionInModalProps {
  interactionId: string;
  href: string;
  isOpen: boolean;
  onClose: () => void;
}

const InteractionInModal: React.FC<InteractionInModalProps> = ({
  interactionId,
  href,
  isOpen,
  onClose,
}) => {
  const bus = useBus();
  const modalRef = useRef<HTMLDivElement>(null);

  const scrollToEndModal = () => {
    if (modalRef && modalRef.current) {
      modalRef.current.scrollTo({
        top: modalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useListener("onSubmittedComment", scrollToEndModal);
  useEffect(() => {
    return () => {
      bus && bus.off("onSubmittedComment", scrollToEndModal);
    };
  }, []);

  return (
    <If condition={isOpen}>
      <Then>
        <Box
          position="fixed"
          left={0}
          top={0}
          w="100vw"
          h="100vh"
          bg="white"
          overflow="auto"
          zIndex={12}
          ref={modalRef}
        >
          <Box pb={8}>
            <InteractionDetail
              id={interactionId}
              href={href}
              onClose={onClose}
            />
          </Box>
        </Box>
      </Then>
    </If>
  );
};

export default InteractionInModal;
