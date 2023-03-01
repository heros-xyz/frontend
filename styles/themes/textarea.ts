import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const Textarea = defineStyleConfig({
  variants: {
    flushed: defineStyle({
      borderColor: "primary",
      borderBottom: "1px solid",
      _invalid: {
        borderColor: "error.dark !important",
        boxShadow: "none",
      },
    }),
  },
});
