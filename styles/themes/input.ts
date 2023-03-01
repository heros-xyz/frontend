import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    borderColor: "primary",
    _invalid: {
      borderColor: "error.dark",
    },
  },
});

const sizes = {
  base: definePartsStyle({}),
};
export const Input = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    flushed: {
      field: {
        bgColor: "transparent",
        borderColor: "primary",
        borderBottom: "1px solid",
        _invalid: {
          borderColor: "error.dark",
          boxShadow: "none",
        },
      },
    },
  },
});
