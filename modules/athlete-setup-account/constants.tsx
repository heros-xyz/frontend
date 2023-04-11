const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const LARGE_SIZE_MESSAGE =
  "Your image size is too large, limit size is less than 10MB";
const FILE_FORMAT_MESSAGE =
  "Error image format. Please upload file in JPEG, PNG.";

const REQUIRED_MESSAGE = "This is a required field.";

const getCharacterMessage = (field: string) =>
  `${field} cannot exceeds 20 characters `;

export {
  MAX_SIZE,
  ALLOWED_TYPES,
  LARGE_SIZE_MESSAGE,
  FILE_FORMAT_MESSAGE,
  REQUIRED_MESSAGE,
  getCharacterMessage,
};
