import { useEffect } from "react";
import dayjs, { UnitType } from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { isBeforeEndDate, isValidDate } from "@/utils/functions";
import {
  useAddPostInteractionMutation,
  useUpdatePostInteractionMutation,
} from "@/api/athlete";
import {
  MAX_SIZE_MEDIA_POST_IMAGE,
  MAX_SIZE_MEDIA_POST_VIDEO,
  ALLOWED_TYPES_POST_IMAGE,
  ALLOWED_TYPES_POST_VIDEO,
} from "@/utils/inputRules";
import { updateSession } from "@/utils/auth";
import { IMediaExisted } from "@/types/athlete/types";
import { IHerosError } from "@/types/globals/types";
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
          .test("valid-media", "Invalid", (value) => {
            if (typeof value === "string") return true;

            return (
              value?.size <=
              (value?.type?.split("/")[0] === "image"
                ? MAX_SIZE_MEDIA_POST_IMAGE
                : MAX_SIZE_MEDIA_POST_VIDEO)
            );
          })
          .test("valid-media-type", "InvalidType", (value) => {
            if (typeof value === "string") return true;

            return value?.type?.split("/")[0] === "image"
              ? ALLOWED_TYPES_POST_IMAGE.includes(value?.type)
              : ALLOWED_TYPES_POST_VIDEO.includes(value?.type);
          }),
      })
    ),
});

export const useInteractionInfo = () => {
  const toast = useToast();
  const [submit, { data: postInfo, isLoading, error }] =
    useAddPostInteractionMutation();
  const router = useRouter();
  useEffect(() => {
    if (postInfo) {
      router.push("/athlete/interactions");
      updateSession();
    }
  }, [postInfo]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({
      content,
      tags,
      listMedia,
      publicDate,
      publicTime,
      schedule,
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime}`).toUTCString();
      const mapPayload = {
        content,
        tags,
        listMedia,
        schedule,
        publicDate: dayjs(formatDate).format(),
      };

      submit(mapPayload);
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
          "Something went wrong, please try again!",
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
  const [submit, { data: editPostData, isLoading, error }] =
    useUpdatePostInteractionMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({
      interactionId,
      content,
      tags,
      listMedia,
      schedule,
      publicDate,
      publicTime,
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime}`).toUTCString();
      const listMediaExisted = listMedia.filter(
        (item) => typeof item.file === "string"
      ) as IMediaExisted[];
      listMedia = listMedia.filter((item) => typeof item.file !== "string");
      const mapPayload = {
        content,
        tags,
        listMedia,
        listMediaExisted,
        schedule,
        publicDate: dayjs(formatDate).format(),
      };
      submit({ interactionId, data: mapPayload });
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (editPostData) {
      router.push("/athlete/interactions");
    }
  }, [editPostData]);

  useEffect(() => {
    if (error) {
      toast({
        title:
          (error as IHerosError)?.data?.error ||
          "Something went wrong, please try again!",
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
