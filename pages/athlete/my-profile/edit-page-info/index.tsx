import {
  Box,
  Image,
  Center,
  Input,
  Text,
  Flex,
  Tag,
  TagLabel,
  Button,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MutableRefObject,
} from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Close } from "@/components/svg/Close";
import { IconEdit } from "@/components/svg/IconEdit";
import {
  MAX_SIZE,
  LARGE_SIZE_MESSAGE,
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
} from "@/utils/inputRules";
import { IHerosError } from "@/types/globals/types";
import BackButton from "@/components/ui/BackButton";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";
import { useAuthContext } from "@/context/AuthContext";
import { useUploadAvatarToUser } from "@/libs/dtl";
import useUpdateDoc from "@/hooks/useUpdateDoc";

const EditPageInfo = () => {
  const toast = useToast();
  const { data } = useMyAthleteProfile();
  const { userProfile } = useAuthContext();
  const [error, setError] = useState<IHerosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [input, setInput] = useState("");
  const [tagsValue, setTags] = useState<string[]>([]);
  const upload = useRef() as MutableRefObject<HTMLInputElement>;
  const [image, setImage] = useState("");
  const [fileSubmit, setFileSubmit] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMaxTag, setIsMaxTag] = useState<boolean>(false);
  const { uploadAvatar } = useUploadAvatarToUser();
  const { updateDocument } = useUpdateDoc();

  const validationSchema = Yup.object().shape({
    nickName: Yup.string()
      .required("This is a required field.")
      .max(20, "Nickname cannot exceed 20 characters"),
    tagLine: Yup.string().max(100, "Tagline cannot exceed 100 characters"),
  });
  const initialPageValues = {
    nickName: data?.nickName ?? "",
    tagLine: data?.tagline ?? "",
    tags: data?.tags ?? [],
    avatar: "",
  };

  useEffect(() => {
    formik.setFieldValue("nickName", data?.nickName);
    formik.setFieldValue("avatar", userProfile?.avatar);
    formik.setFieldValue("tagLine", data?.tagline);
    formik.setFieldValue("tags", data?.tags);
    setTags(data?.tags ?? []);
  }, [userProfile?.avatar, data?.nickName]);

  const formik = useFormik({
    initialValues: initialPageValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { nickName, tagLine } = values;

        if (!!fileSubmit) {
          const avatarUrl = await uploadAvatar(fileSubmit as unknown as File);
          await updateDocument(`user/${userProfile?.uid}`, {
            avatar: avatarUrl,
          });
          await updateDocument(`athleteProfile/${userProfile?.uid}`, {
            avatar: avatarUrl,
          });
        }
        const athleteProfileParams = {
          nickName: nickName,
          tagline: tagLine,
          tags: tagsValue,
        };

        await updateDocument(
          `athleteProfile/${userProfile?.uid}`,
          athleteProfileParams
        );
        setIsSuccess(true);
      } catch (error) {
        setError({ data: error } as IHerosError);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log("cambios", formik.dirty);
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [formik.dirty]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.replaceAll(/[^a-zA-Z0-9]/g, ""));
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && Boolean(input) && input.length < 26) {
      if (tagsValue.includes(input)) {
        setInput("");
        return;
      }
      if (tagsValue.length < 5) {
        setTags((prev) => [...prev, input]);
        setIsMaxTag(false);
        setInput("");
      } else {
        setIsMaxTag(true);
      }
    }
  };
  const onHandleRemoveTag = (index: number) => {
    const array = [...tagsValue];
    if (index !== -1) {
      array.splice(index, 1);
      setTags(array);
    }
  };

  const onClickUploadImage = () => {
    upload?.current?.click();
  };

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    formik.setFieldValue("avatar", URL.createObjectURL(selectedFile));
    setImage(URL.createObjectURL(selectedFile));
    setFileSubmit(selectedFile);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  if (!userProfile?.uid) {
    return <></>;
  }

  return (
    <Box pt={5} minH="100vh" color="primary">
      <Head>
        <title>Athlete | Edit Page Information</title>
      </Head>
      <Center
        color="primary"
        flexDirection="column"
        p={"5"}
        pt={{ xl: "3.75rem" }}
      >
        <Box w={{ base: "full", xl: "30rem" }}>
          <Box w="full" fontWeight="bold">
            <BackButton
              href="/athlete/my-profile"
              title=" Edit Page Information"
            />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              w="full"
              fontSize={{ base: "sm", xl: "md" }}
              mb={{ base: 5, xl: 10 }}
              mt={["5", "8"]}
              fontWeight="medium"
            >
              <Text as="span" color="black.primary">
                Nick Name
              </Text>
              <Text as="span" color="error.dark">
                {" *"}
              </Text>
              <Input
                variant="flushed"
                placeholder="Nick Name"
                borderColor="grey.200"
                _focusVisible={{
                  borderColor: "grey.200",
                  boxShadow: "none",
                }}
                name="nickName"
                fontWeight="500"
                fontSize={["sm", "lg"]}
                onChange={formik.handleChange}
                value={formik?.values?.nickName}
                isInvalid={Boolean(
                  formik.errors.nickName && formik.touched.nickName
                )}
              />
              <ErrorMessage
                mt={0.5}
                condition={formik.errors.nickName && formik.touched.nickName}
                errorMessage={formik.errors.nickName}
              />
            </Box>
            <Box>
              <Box fontSize={["sm", "md"]} fontWeight="medium">
                <Text as="span" color="black.primary">
                  Your profile pic
                </Text>
                <Text as="span" color="error.dark">
                  {" *"}
                </Text>
              </Box>
              <Center>
                <Box
                  mt={["5", "8"]}
                  position="relative"
                  onClick={onClickUploadImage}
                >
                  <Image
                    w={{ base: "120px", xl: "200px" }}
                    h={{ base: "160px", xl: "250px" }}
                    src={image || formik.values.avatar}
                    alt="user-avatar"
                    objectFit="cover"
                    borderRadius={{ base: "none", xl: "md" }}
                    fallbackSrc="/images/DefaultAvaCircle.png"
                  />
                  <Center
                    position="absolute"
                    w={{ base: "120px", xl: "200px" }}
                    h={{ base: "160px", xl: "250px" }}
                    top="0"
                    left="0"
                    borderRadius={{ base: "none", xl: "md" }}
                    bg="linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))"
                    cursor={"pointer"}
                  >
                    <IconEdit color="primary" />
                  </Center>
                </Box>
              </Center>
              <Center>
                {errorMessage && (
                  <Box
                    mt={2}
                    color="error.dark"
                    data-testid="error-message"
                    fontSize="xs"
                  >
                    {errorMessage}
                  </Box>
                )}
              </Center>

              <VisuallyHiddenInput
                ref={upload}
                type="file"
                accept="image/jpeg,image/png"
                onChange={onChangeAvatar}
              />
            </Box>
            <Box
              w="full"
              fontSize={{ base: "sm", xl: "md" }}
              mt={{ base: 5, xl: 10 }}
            >
              <Text
                fontSize={["sm", "md"]}
                fontWeight="medium"
                color="black.primary"
              >
                Tagline (50 words limited)
              </Text>
              <Input
                variant="flushed"
                placeholder="Tagline"
                borderColor="grey.200"
                _focusVisible={{
                  borderColor: "grey.200",
                  boxShadow: "none",
                }}
                name="tagLine"
                fontWeight={500}
                fontSize={["sm", "lg"]}
                onChange={formik.handleChange}
                value={formik?.values?.tagLine}
                isInvalid={Boolean(
                  formik.errors.tagLine && formik.touched.tagLine
                )}
              />
              <ErrorMessage
                mt={0.5}
                condition={formik.errors.tagLine && formik.touched.tagLine}
                errorMessage={formik.errors.tagLine}
              />
            </Box>
            <Box
              w="full"
              fontSize={{ base: "sm", xl: "md" }}
              mt={{ base: 5, xl: 10 }}
            >
              <Text
                fontSize={["sm", "md"]}
                fontWeight="medium"
                color="black.primary"
              >
                Tags
              </Text>
              <Text color="grey.200" fontSize={{ base: "xs", xl: "md" }}>
                Help people find you easier by adding keywords related to you
                and your content.
              </Text>
              <Input
                variant="flushed"
                placeholder="Add Tags"
                borderColor="grey.200"
                _focusVisible={{
                  borderColor: "grey.200",
                  boxShadow: "none",
                }}
                name="tags"
                fontSize={["sm", "lg"]}
                onKeyDown={handleKeyDown}
                value={input}
                onChange={handleChange}
                fontWeight="medium"
                isInvalid={Boolean(input?.length > 25)}
                autoComplete="off"
              />
              <ErrorMessage
                mt={0.5}
                condition={input?.length > 25}
                errorMessage={"Tag cannot exceed 25 characters."}
              />
              <ErrorMessage
                condition={isMaxTag && tagsValue.length === 5}
                errorMessage="The maximum number of tags are 5."
              />
            </Box>
            {tagsValue && (
              <Flex
                mt={{ base: 2, xl: 7 }}
                gap={{ base: 2.5, xl: 4 }}
                wrap="wrap"
              >
                {tagsValue.map((tag, index: number) => (
                  <Tag
                    size="lg"
                    borderRadius="full"
                    variant="solid"
                    py={{ base: 0.5, xl: 1 }}
                    px={{ base: 2.5, xl: 4 }}
                    colorScheme="tagTheme"
                    bg="accent.2"
                    maxHeight={{ base: "26px", xl: "33px" }}
                    key={tag}
                  >
                    <TagLabel
                      fontSize={{ base: "sm", xl: "lg" }}
                      fontWeight="medium"
                      color="#fff"
                      lineHeight={{ base: 3, xl: "140%" }}
                      mr={{ base: 4, xl: 2.5 }}
                    >
                      #{tag}
                    </TagLabel>
                    <Close
                      cursor="pointer"
                      width={{ base: "10px", xl: "12px" }}
                      height={{ base: "10px", xl: "12px" }}
                      onClick={() => onHandleRemoveTag(index)}
                    />
                  </Tag>
                ))}
              </Flex>
            )}
            <Box
              w="full"
              fontSize={{ base: "sm", xl: "md" }}
              my={{ base: 10, xl: 5 }}
            >
              <Flex justify={{ base: "center", xl: "flex-end" }}>
                <Button
                  variant="secondary"
                  width={{ base: "100%", xl: "auto" }}
                  fontSize={{ base: "md", xl: "xl" }}
                  h="48px"
                  mt={{ base: 5, xl: 3.5 }}
                  type="submit"
                  isLoading={isLoading}
                >
                  SAVE
                </Button>
              </Flex>
              {isSuccess && (
                <Flex justify={{ base: "center", xl: "flex-end" }} pt="2">
                  <Text color="#65D169">Changes Saved</Text>
                </Flex>
              )}
            </Box>
          </form>
        </Box>
      </Center>
    </Box>
  );
};

export default EditPageInfo;

EditPageInfo.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
