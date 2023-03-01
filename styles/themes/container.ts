import { defineStyleConfig } from "@chakra-ui/react";

export const Container = defineStyleConfig({
  sizes: {
    base: {
      maxW: "100%",
      px: 5,
    },
    full: {
      maxW: "100%",
      px: 0,
    },
    sm: {
      maxW: "640px",
      px: 5,
    },
    md: {
      maxW: "740px",
      px: 5,
    },
    lg: {
      maxW: "960px",
      px: 5,
    },
    xl: {
      maxW: "1280px",
      px: 5,
    },
    "500px": {
      maxW: "500px",
      px: 0,
    },
  },
  defaultProps: {
    size: "base",
  },
});
