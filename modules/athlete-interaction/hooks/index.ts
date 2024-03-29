import { useEffect } from "react";
import dayjs from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {serverTimestamp, Timestamp} from "firebase/firestore";
import { isBeforeEndDate, isValidDate } from "@/utils/time";
import {
  MAX_SIZE_MEDIA_POST_IMAGE,
  MAX_SIZE_MEDIA_POST_VIDEO,
  ALLOWED_TYPES_POST_IMAGE,
  ALLOWED_TYPES_VIDEO,
  LARGE_SIZE_MEDIA_POST_IMAGE,
  LARGE_SIZE_MEDIA_POST_VIDEO,
  FILE_FORMAT_MEDIA_POST_IMAGE,
  FILE_FORMAT_MEDIA_POST_VIDEO
} from "@/utils/inputRules";
import { IMediaExisted } from "@/types/athlete/types";
import { IHerosError } from "@/types/globals/types";
import { useEditPost, usePostsAsMaker } from "@/libs/dtl/post";
export interface IUploadFile {
  type: string;
  file: File | string;
}
export interface IValuesTypes {
  interactionId: string;
  content: string;
  listMedia: IUploadFile[];
  tags: string[];
  publicType: string;
  schedule: boolean;
  publicDate: string;
  publicTime: string;
  isPost: boolean;
}

const publicDateValidation = (
  schedule: boolean,
  publicTime: string,
  isPost: boolean,
  schema: any
) => {
  if (schedule && isPost) {
    return schema
      .test("valid-date", "Invalid date", (value: string) => {
        return isValidDate(value);
      })
      .test(
        "is-before-end-date",
        "Public date and time must be equal to or greater than current date and time",
        (value: string) => {
          const publicDate = new Date(`${value} ${publicTime}`);
          const publicDateFormat = dayjs(publicDate).format("YYYY/MM/DD HH:mm");

          return isBeforeEndDate(
            dayjs(new Date()).subtract(1, "minute").format("YYYY/MM/DD HH:mm"),
            publicDateFormat,
            "YYYY/MM/DD HH:mm"
          );
        }
      );
  }

  return schema;
};

const getExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts[parts.length - 1]?.toLocaleLowerCase();
}

const initialValues = {
  interactionId: "",
  content: "",
  listMedia: [] as IUploadFile[],
  tags: [] as string[],
  publicType: "fanOnly",
  schedule: false,
  publicDate: dayjs().format("YYYY-MM-DD"),
  publicTime: dayjs().format("HH:mm"),
  isPost: true,
};

const validationSchema = yup.object().shape({
  schedule: yup.boolean(),
  isPost: yup.boolean(),
  publicTime: yup.string(),
  content: yup
    .string()
    .max(2000, "Your interaction cannot exceed 2000 characters."),
  publicDate: yup
    .string()
    .when(["schedule", "publicTime", "isPost"], publicDateValidation as any),
  listMedia: yup
    .array()
    .test(
      "valid-media",
      "Your media upload cannot exceed 10 files",
      (value) => {
        if (value?.length) {
          return value?.length <= 10;
        }
        return true;
      }
    )
    .of(
      yup.object().shape({
        file: yup
          .mixed()
          .test("valid-image-size", LARGE_SIZE_MEDIA_POST_IMAGE, (value) => {
            if (typeof value === "string" || value?.type?.split("/")[0] === "video") return true;

            return (
              value?.size <= MAX_SIZE_MEDIA_POST_IMAGE
            );
          })
          .test("valid-video-size", LARGE_SIZE_MEDIA_POST_VIDEO, (value) => {
            if (typeof value === "string" || value?.type?.split("/")[0] === "image") return true;

            return (
              value?.size <= MAX_SIZE_MEDIA_POST_VIDEO
            );
          })
          .test("valid-image-type", FILE_FORMAT_MEDIA_POST_IMAGE, (value) => {
            if (typeof value === "string" || value?.type?.split("/")[0] === "video") return true;

            return ALLOWED_TYPES_POST_IMAGE.includes(value?.type)
          })
          .test("valid-video-type", FILE_FORMAT_MEDIA_POST_VIDEO, (value) => {
            if (typeof value === "string" || value?.type?.split("/")[0] === "image") return true;

            return ALLOWED_TYPES_VIDEO.includes(getExtension(value?.name))
          }),
      })
    ),
});

export const useInteractionInfo = () => {
  const toast = useToast();
  const { create: { create, error, success: successCreate, loading: isLoading } } = usePostsAsMaker(false)
  const router = useRouter();

  useEffect(() => {
    if (successCreate) {
      router.push("/athlete/interactions");
    }
  }, [successCreate]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({
      content,
      tags,
      listMedia,
      publicDate,
      publicTime,
      schedule,
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime}`)
      const mapPayload = {
        content,
        tags,
        listMedia,
        schedule,
        publicDate: Timestamp.fromDate(formatDate),
        createdAt: serverTimestamp()
      };

      await create(mapPayload as any)
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error ||
          "Oops! Something went wrong, please try again!",
        status: "error",
      });
    }
  }, [error]);

  return {
    formik,
    initialValues,
    isLoading,
    error,
    handleSubmit,
  };
};

export const useUpdateInteractionInfo = () => {
  const toast = useToast();
  const { edit, loading: isLoading, error, success: successEdit } = useEditPost()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({
      interactionId,
      content,
      tags,
      listMedia,
      schedule,
      publicDate,
      publicTime,
      ...rest
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime}`).toUTCString();
      const listMediaExisted = listMedia.filter(
        (item) => typeof item.file === "string"
      ) as IMediaExisted[];

      listMedia = listMedia.filter((item) => typeof item.file !== "string");

      const mapPayload = {
        content,
        tags,
        newMedia: listMedia,
        listMediaExisted, // old data
        schedule,
       // publicDate: dayjs(formatDate).format() as string,
      };

      await edit(interactionId, mapPayload as any)
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error ||
          "Oops! Something went wrong, please try again!",
        status: "error",
      });
    }
  }, [error]);

  return {
    formik,
    initialValues,
    isLoading,
    error,
    handleSubmit,
    successEdit
  };
};
