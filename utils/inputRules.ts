const MAX_SIZE = 2 * 1024 * 1024;
const MAX_SIZE_MEDIA_POST_IMAGE = 30 * 1024 * 1024;
const MAX_SIZE_MEDIA_POST_VIDEO = 1 * 1024 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ALLOWED_TYPES_POST_IMAGE = ["image/jpeg", "image/png", "image/gif"];

const ALLOWED_TYPES_POST_VIDEO = ["video/mov", "video/mp4", "video/avi"];

const LARGE_SIZE_MESSAGE =
  "Your image size is too large, limit size is less than 2MB";
const ERROR_SIZE_UPLOAD_POST_MEDIA =
  "Your image file size must not exceed 30MB and video file size must not exceed 1GB.";

const LARGE_SIZE_MEDIA_POST_IMAGE =
  "Your image file size must not exceed 30MB.";

const FILE_FORMAT_MEDIA_POST_IMAGE =
  "Your image file is not in correct format. The allowed image formats are JPEG, PNG, and GIF.";
const ERROR_TYPE_UPLOAD_POST_MEDIA =
  "Your file is not in correct format. The allowed image formats are JPEG, PNG, GIF and video formats are MOV, MP4, AVI.";

const LARGE_SIZE_MEDIA_POST_VIDEO = "Your video file size must not exceed 1GB.";

const FILE_FORMAT_MEDIA_POST_VIDEO =
  "Your video file is not in correct format. The allowed video formats are MOV, MP4, AVI.";
const FILE_FORMAT_MESSAGE =
  "Error image format. Please upload file in JPEG, PNG.";

const REQUIRED_MESSAGE = "This is a required field.";

const getCharacterMessage = (field: string) =>
  `${field} cannot exceeds 20 characters `;

export {
  MAX_SIZE,
  ALLOWED_TYPES,
  ALLOWED_TYPES_POST_IMAGE,
  ALLOWED_TYPES_POST_VIDEO,
  LARGE_SIZE_MESSAGE,
  MAX_SIZE_MEDIA_POST_IMAGE,
  MAX_SIZE_MEDIA_POST_VIDEO,
  LARGE_SIZE_MEDIA_POST_IMAGE,
  FILE_FORMAT_MEDIA_POST_IMAGE,
  LARGE_SIZE_MEDIA_POST_VIDEO,
  FILE_FORMAT_MEDIA_POST_VIDEO,
  FILE_FORMAT_MESSAGE,
  REQUIRED_MESSAGE,
  ERROR_SIZE_UPLOAD_POST_MEDIA,
  ERROR_TYPE_UPLOAD_POST_MEDIA,
  getCharacterMessage,
};
