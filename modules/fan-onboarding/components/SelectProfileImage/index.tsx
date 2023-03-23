import { MutableRefObject, useMemo, useRef, useState } from "react";
import { Box, Flex, Image, VisuallyHiddenInput } from "@chakra-ui/react";
import { IconOnboarding } from "@/components/svg/IconOnboarding";
import { UploadIcon } from "@/components/svg/UploadIcon";
import { PencilEdit } from "@/components/svg/PencilEdit";
import { ArrowRight } from "@/components/svg/ArrowRight";
import {
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
  LARGE_SIZE_MESSAGE,
  MAX_SIZE,
} from "@/utils/inputRules";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
interface IProp {
  onSubmit: (image: File) => void;
  avatar: File | null;
}
const UploadProfileImage: React.FC<IProp> = ({ avatar, onSubmit }) => {
  const upload = useRef() as MutableRefObject<HTMLInputElement>;
  const [image, setImage] = useState(avatar ? URL.createObjectURL(avatar) : "");
  const [fileSubmit, setFileSubmit] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    if (selectedFile.size > MAX_SIZE) {
      setErrorMessage(LARGE_SIZE_MESSAGE);
      return;
    }
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage(FILE_FORMAT_MESSAGE);
      return;
    }

    setImage(URL.createObjectURL(selectedFile));
    setFileSubmit(selectedFile);
    setErrorMessage(null);
  };

  const onClickUploadImage = () => {
    upload?.current?.click();
  };

  const handleSubmit = () => {
    if (fileSubmit) onSubmit(fileSubmit);
  };

  const Icon = useMemo(() => {
    if (image) {
      return (
        <Flex
          position="relative"
          w={{ base: "150px", xl: "240px" }}
          h={{ base: "150px", xl: "240px" }}
          rounded="full"
          overflow="hidden"
          onClick={onClickUploadImage}
        >
          <Image
            src={image}
            position="absolute"
            alt="preview"
            w={{ base: "150px", xl: "240px" }}
            h={{ base: "150px", xl: "240px" }}
            objectFit="cover"
          />
          <Flex
            zIndex={2}
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            bg="gradient.dark"
          >
            <PencilEdit />
          </Flex>
        </Flex>
      );
    }
    return (
      <IconOnboarding
        w={{ base: "150px", xl: "240px" }}
        h={{ base: "150px", xl: "240px" }}
        color={{ base: "accent.1", xl: "white" }}
      />
    );
  }, [image]);

  return (
    <HerosOnboardingWrapperNew
      Icon={Icon}
      textButton={image ? "Proceed" : "Upload Image"}
      IconButton={image ? <ArrowRight /> : <UploadIcon />}
      onSubmit={image ? handleSubmit : onClickUploadImage}
      bgIconColor={"accent.1"}
    >
      <Box color="primary">
        <Box mb={{ base: 5, lg: 8 }}>
          <Box mb={2.5} fontSize={{ lg: "xl" }} fontWeight="500">
            Upload Profile Image
          </Box>
          <Box
            mb={1}
            fontWeight="normal"
            color="grey.300"
            fontSize={{ base: "xs", lg: "md" }}
          >
            This is how other people will see you. We recommend a square image
            of at least 450 x 450px.
          </Box>
          {errorMessage && (
            <Box color="red.500" data-testid="error-message" fontSize="xs">
              {errorMessage}
            </Box>
          )}
        </Box>
        <VisuallyHiddenInput
          ref={upload}
          type="file"
          accept="image/jpeg,image/png"
          onChange={onChange}
        />
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default UploadProfileImage;
