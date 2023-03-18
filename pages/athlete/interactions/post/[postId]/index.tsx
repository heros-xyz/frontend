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
import { isBeforeEndDate } from "@/utils/functions";

function EditInteractionsPost() {
  const { formik, handleSubmit, isLoading } = useUpdateInteractionInfo();
  const router = useRouter();
  const { postId } = router.query;

  const { data: postInfo } = useGetInteractionDetailQuery(postId as string, {
    skip: typeof postId !== "string" || !Boolean(postId),
  });

  const checkPublicDateTime = (
    publicDate: string | Date | null | undefined
  ) => {
    const publicDateFormat = dayjs(publicDate).format("YYYY/MM/DD HH:mm");

    if (
      isBeforeEndDate(
        publicDateFormat,
        dayjs(new Date()).subtract(1, "minute").format("YYYY/MM/DD HH:mm"),
        "YYYY/MM/DD HH:mm"
      ) ||
      !publicDate
    ) {
      return {
        publicDate: dayjs().format("YYYY-MM-DD"),
        publicTime: dayjs().format("HH:mm"),
      };
    }

    return {
      publicDate: dayjs(publicDate).format("YYYY-MM-DD"),
      publicTime: dayjs(publicDate).format("HH:MM"),
    };
  };

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
      publicDate: checkPublicDateTime(postInfo?.publicDate).publicDate,
      publicTime: checkPublicDateTime(postInfo?.publicDate).publicTime,
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
      <Box bg="primary" minHeight="100vh">
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
