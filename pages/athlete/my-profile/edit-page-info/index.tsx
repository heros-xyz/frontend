import {
  Box,
  Image,
  Center,
  Input,
  Link,
  Text,
  Flex,
  Tag,
  TagLabel,
  Button,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
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
import NextLink from "next/link";
import { getImageLink } from "@/utils/link";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Close } from "@/components/svg/Close";
import {
  useEditPageInfoMutation,
  useGetPageInformationQuery,
} from "@/api/athlete";
import { IconEdit } from "@/components/svg/IconEdit";
import {
  MAX_SIZE,
  LARGE_SIZE_MESSAGE,
  ALLOWED_TYPES,
  FILE_FORMAT_MESSAGE,
} from "@/utils/inputRules";
import { updateSession } from "@/utils/auth";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const EditPageInfo = () => {
  const { data: session } = useSession();
  const { data: pageInfo } = useGetPageInformationQuery("");
  const [editPageInfo, { data: editPageInfoData, isLoading, isSuccess }] =
    useEditPageInfoMutation();
  const [input, setInput] = useState("");
  const [tagsValue, setTags] = useState<string[]>([]);
  const upload = useRef() as MutableRefObject<HTMLInputElement>;
  const [image, setImage] = useState("");
  const [fileSubmit, setFileSubmit] = useState<File>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    nickName: Yup.string()
      .required("This is a required field!")
      .max(20, "Nickname cannot exceed 20 characters"),
    tagLine: Yup.string().max(100, "Tagline cannot exceed 100 characters"),
  });
  const initialPageValues = {
    nickName: "",
    tagLine: "",
    tags: [],
    avatar: "",
  };

  useEffect(() => {
    if (pageInfo) {
      const oldTags = pageInfo?.tags.map((item) => item?.name);
      setTags(oldTags);
    }
  }, [pageInfo]);

  useEffect(() => {
    if (editPageInfoData) {
      updateSession();
    }
  }, [editPageInfoData]);

  useEffect(() => {
    formik.setFieldValue("nickName", session?.user?.nickname);
    formik.setFieldValue("avatar", session?.user?.avatar);
    formik.setFieldValue("tagLine", pageInfo?.tagLine);
    formik.setFieldValue("tags", pageInfo?.tags);
  }, [pageInfo, session]);

  const formik = useFormik({
    initialValues: initialPageValues,
    validationSchema,
    onSubmit: (values) => {
      const { nickName, tagLine, ...newValues } = values;
      const editData = {
        ...newValues,
        nickName: nickName,
        avatar: fileSubmit,
        tagLine: tagLine,
        tags: tagsValue,
      };
      editPageInfo(editData);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ",") return;
    setInput(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      Boolean(input) &&
      input.length < 26
    ) {
      if (tagsValue.includes(input)) {
        setInput("");
        return;
      }
      setTags((prev) => [...prev, input.trim()]);
      setInput("");
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
            <Link as={NextLink} href="/athlete/my-profile">
              <ArrowLeft
                verticalAlign=""
                w={{ base: "14px", xl: "18px" }}
                h={{ base: "14px", xl: "18px" }}
                onClick={() => {
                  console.log("Back");
                }}
                cursor="pointer"
              />
            </Link>
            <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
              Edit Page Information
            </Text>
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
                borderColor="grey.100"
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
                    src={image || getImageLink(formik.values.avatar)}
                    alt="user-avatar"
                    objectFit="cover"
                    borderRadius={{ base: "none", xl: "md" }}
                    fallbackSrc="https://via.placeholder.com/50"
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
                placeholder="Nick Name"
                borderColor="grey.100"
                name="tagLine"
                fontWeight={500}
                fontSize={["sm", "lg"]}
                onChange={formik.handleChange}
                value={formik?.values?.tagLine}
                isInvalid={Boolean(
                  formik.errors.tagLine && formik.touched.tagLine
                )}
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
                borderColor="grey.100"
                name="tags"
                fontSize={["sm", "lg"]}
                onKeyDown={handleKeyDown}
                value={input}
                onChange={handleChange}
                fontWeight="medium"
              />
              <ErrorMessage errorMessage={undefined} condition={undefined} />
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
