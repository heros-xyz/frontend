import { useEffect } from "react";
import dayjs, { UnitType } from "dayjs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { isBeforeEndDate, isValidDate } from "@/utils/functions";
import { useAddPostInteractionMutation } from "@/api/athlete";
import {
  MAX_SIZE_MEDIA_POST_IMAGE,
  MAX_SIZE_MEDIA_POST_VIDEO,
  ALLOWED_TYPES_POST_IMAGE,
  ALLOWED_TYPES_POST_VIDEO,
} from "@/utils/inputRules";
export interface IUploadFile {
  type: string;
  file: File;
}
export interface IValuesTypes {
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
  content: "",
  listMedia: [],
  tags: [],
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
            return (
              value.size <=
              (value.type.split("/")[0] === "image"
                ? MAX_SIZE_MEDIA_POST_IMAGE
                : MAX_SIZE_MEDIA_POST_VIDEO)
            );
          })
          .test("valid-media-type", "InvalidType", (value) => {
            return value.type.split("/")[0] === "image"
              ? ALLOWED_TYPES_POST_IMAGE.includes(value.type)
              : ALLOWED_TYPES_POST_VIDEO.includes(value.type);
          }),
      })
    ),
});

export const useInteractionInfo = () => {
  const [submit, { data: postInfo, isLoading }] =
    useAddPostInteractionMutation();
  const router = useRouter();
  useEffect(() => {
    if (postInfo) {
      router.push("/athlete/interactions");
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
      const fomtDate = new Date(`${publicDate} ${publicTime} UTC`);
      const mapPayload = {
        content,
        tags,
        listMedia,
        publicType,
        publicDate: fomtDate.toISOString(),
      };
      submit(mapPayload);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return {
    formik,
    initialValues,
    isLoading,
    handleSubmit,
  };
};
