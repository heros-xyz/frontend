import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { FormikContext } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import InteractionsPost from "@/modules/athlete-interaction/components/post";
import {
  IValuesTypes,
  useUpdateInteractionInfo,
} from "@/modules/athlete-interaction/hooks";
import { useGetInteractionDetailQuery } from "@/api/athlete";
import { getImageLink } from "@/utils/link";

function EditInteractionsPost() {
  const { formik, handleSubmit, isLoading } = useUpdateInteractionInfo();
  const router = useRouter();
  const { postId } = router.query;

  const { data: postInfo } = useGetInteractionDetailQuery(postId as string, {
    skip: typeof postId !== "string" || !Boolean(postId),
  });

  const setInitialValue = () => {
    const initValues = {
      interactionId: postInfo?.id,
      content: postInfo?.content || "",
      listMedia: postInfo?.interactionMedia?.map((item) => ({
        id: item.id,
        fileName: item.url,
        type: item.type,
        extension: item.extension,
        file: getImageLink(item.url),
      })),
      tags: postInfo?.tags?.map((item) => item.name),
      publicType: postInfo?.publicType || "all",
      schedule: postInfo?.isSchedulePost,
      publicDate: dayjs(postInfo?.publicDate).format("YYYY-MM-DD"),
      publicTime: dayjs(postInfo?.publicDate).format("HH:MM"),
      isPost: false,
    };

    formik.setValues(initValues as IValuesTypes);
  };

  useEffect(() => {
    if (postInfo) {
      setInitialValue();
    }
  }, [postInfo]);

  return (
    <FormikContext.Provider value={formik}>
      <Head>
        <title>Athlete | Edit Interaction</title>
      </Head>
      <Box minHeight="100vh">
        <Container
          position="relative"
          size={["base", "sm", "md", "lg", "500px"]}
        >
          <InteractionsPost
            isEdit
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            onBack={() => router.push("/athlete/interactions")}
          />
        </Container>
      </Box>
    </FormikContext.Provider>
  );
}

export default EditInteractionsPost;
