import { useEffect } from "react";
import dayjs, { UnitType } from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
  earlyAccess: boolean;
  publicDate: string;
  publicTime: string;
}

const getTime = (type: UnitType) => {
  const time = dayjs().get(type);
  if (+time < 10) {
    return `0${time}`;
  }
  return time;
};

const initialValues = {
  interactionId: "",
  content: "",
  listMedia: [] as IUploadFile[],
  tags: [] as string[],
  publicType: "all",
  earlyAccess: false,
  publicDate: dayjs().add(3, "day").format("YYYY-MM-DD"),
  publicTime: `${getTime("hour")}:${getTime("minute")}`,
};

const validationSchema = yup.object().shape({
  content: yup
    .string()
    .max(2000, "Your interaction cannot exceed 2000 characters."),
  publicDate: yup
    .string()
    .test("valid-date", "Please select valid date", (value) => {
      return isValidDate(value);
    })
    .test(
      "is-before-end-date",
      "Public date must be greatter than today",
      (value) => {
        if (value) {
          return isBeforeEndDate(dayjs(new Date()).format("YYYY/MM/DD"), value);
        }
        return true;
      }
    ),
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
      publicType,
      publicDate,
      publicTime,
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime} UTC`);
      const mapPayload = {
        content,
        tags,
        listMedia,
        publicType,
        publicDate: formatDate.toISOString(),
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
          (error as any)?.data?.error ||
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
      publicType,
      publicDate,
      publicTime,
    }) => {
      const formatDate = new Date(`${publicDate} ${publicTime} UTC`);
      const listMediaExisted = listMedia.filter(
        (item) => typeof item.file === "string"
      ) as IMediaExisted[];
      listMedia = listMedia.filter((item) => typeof item.file !== "string");
      const mapPayload = {
        content,
        tags,
        listMedia,
        listMediaExisted,
        publicType,
        publicDate: formatDate.toISOString(),
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
          (error as any)?.data?.error ||
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
