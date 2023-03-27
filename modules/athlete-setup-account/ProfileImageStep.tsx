import {
  Box,
  FormControl,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { FC, Fragment, useMemo, useState } from "react";
import { IconEdit } from "@/components/svg/IconEdit";
import { NextIcon } from "@/components/svg/NextIcon";
import { UploadIcon } from "@/components/svg/UploadIcon";
import { NextButton, OnboardingProps } from "@/components/ui/OnboardingWrapper";
import FileUpload from "@/components/ui/Upload";
import { IValuesTypes } from "@/modules/athlete-setup-account/hooks/useSetupAccountPage";
import {
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
  LARGE_SIZE_MESSAGE,
  MAX_SIZE,
} from "@/utils/inputRules";
import HerosOnboardingWrapperNew from "@/components/ui/HerosOnboardingWrapperNew";
import { IconOnboarding } from "@/components/svg/IconOnboarding";

const AthleteProfileImageStep: FC<OnboardingProps> = (props) => {
  const { setFieldValue } = useFormikContext<IValuesTypes>();
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (selectedFile.size > MAX_SIZE) {
      setErrorMessage(LARGE_SIZE_MESSAGE);
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage(FILE_FORMAT_MESSAGE);
      setFile(null);
      return;
    }

    setFieldValue("avatar", selectedFile);
    setFile(selectedFile);
    setErrorMessage(null);
  };

  const imgSrc = useMemo(() => file && URL.createObjectURL(file), [file]);

  const IconButton = (
    <Fragment>
      {file ? (
        <NextButton
          textButton="submit"
          IconButton={<NextIcon />}
          type="submit"
          isLoading={props.isLoading}
          showIcon={false}
          h="48px"
        />
      ) : (
        <FileUpload
          text={"upload image"}
          icon={<UploadIcon />}
          onChange={onChange}
        />
      )}
    </Fragment>
  );

  const ImagePreview = () => (
    <VStack
      alignItems={"center"}
      data-testid="athlete-profile-image-step"
      w={{ xl: "340px" }}
    >
      {imgSrc && (
        <FormControl
          width="100%"
          maxHeight={"450px"}
          position="relative"
          overflow="hidden"
          as="label"
          cursor="pointer"
          bg="gradient.dark"
          borderRadius={{ base: "8px", xl: "18px" }}
        >
          <IconEdit
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={10}
            color="white"
          />
          <Image
            zIndex={1}
            width={"100%"}
            alignSelf={"center"}
            style={{ opacity: 0.4 }}
            src={imgSrc}
            alt="preview"
            objectFit="cover"
          />
          <input
            data-testid="file-input"
            hidden
            type="file"
            name="avatar"
            onChange={onChange}
            accept="image/jpeg,image/png"
          />
        </FormControl>
      )}
    </VStack>
  );

  return (
    <HerosOnboardingWrapperNew
      // {...props}
      Icon={
        !file && (
          <IconOnboarding
            w={{ base: "150px", xl: "240px" }}
            h={{ base: "150px", xl: "240px" }}
            color={{ base: "accent.1", xl: "white" }}
          />
        )
      }
      ImagePreview={imgSrc ? <ImagePreview /> : null}
      IconButton={IconButton}
      isUploadImage
      onSubmit={console.log}
      bgIconColor={"accent.1"}
      display="flex"
      alignItems="center"
      isPaddingTop={false}
    >
      <Box mb={{ xl: 12 }}>
        <HStack
          fontWeight="bold"
          fontSize={{ base: "md", xl: "xl" }}
          mb={2.5}
          fontFamily="heading"
          color="primary"
        >
          <Text>Upload Profile Image</Text> <Text color={"error.dark"}>*</Text>
        </HStack>
        <Text
          mb={1}
          fontWeight="400"
          fontSize={{ base: "xs", xl: "md" }}
          color="grey.300"
          fontFamily="heading"
        >
          This is the first thing your fans see on your page. We recommend a
          portrait image of at least 340 x 450px.
        </Text>
        {errorMessage && (
          <Box
            color="red.500"
            data-testid="error-message"
            fontSize={{ base: "xs", xl: "md" }}
          >
            {errorMessage}
          </Box>
        )}
      </Box>
    </HerosOnboardingWrapperNew>
  );
};

export default AthleteProfileImageStep;
