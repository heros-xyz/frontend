import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "8",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
    lg: {
      fontSize: "md",
      px: 6,
      py: 5,
    },
    xl: {
      fontSize: "xl",
      px: 5,
      height: 54,
    },
  },

  variants: {
    primary: {
      bg: "primary",
      color: "secondary",
      _disabled: {
        backgroundColor: "grey.100",
        borderColor: "grey.100",
        color: "grey.300",
        opacity: 1,
        _hover: {
          backgroundColor: "grey.100 !important",
          borderColor: "grey.100 !important",
          color: "grey.300 !important",
          opacity: 1,
        },
      },
      _hover: {
        opacity: 0.8,
      },
    },
    primaryOutline: {
      border: "2px solid",
      borderColor: "primary",
      color: "primary",
      _disabled: {
        borderColor: "grey.100",
        color: "grey.100",
        opacity: 1,
      },
      _hover: {
        opacity: 0.8,
      },
    },
    primaryBorder: {
      bg: "primary",
      color: "secondary",
      border: "2px solid",
      borderColor: "secondary",
      _disabled: {
        backgroundColor: "grey.100",
        borderColor: "grey.100",
        color: "grey.300",
        opacity: 1,
        _hover: {
          backgroundColor: "grey.100 !important",
          borderColor: "grey.100 !important",
          color: "grey.300 !important",
          opacity: 1,
        },
      },
      _hover: {
        opacity: 0.8,
      },
    },
    secondary: {
      bg: "secondary",
      color: "primary",
      _disabled: {
        backgroundColor: "grey.100",
        borderColor: "grey.100",
        color: "grey.300",
        opacity: 1,
        _hover: {
          backgroundColor: "grey.100 !important",
          borderColor: "grey.100 !important",
          color: "grey.300 !important",
          opacity: 1,
        },
      },
      _hover: {
        opacity: 0.8,
      },
    },
    secondaryOutline: {
      borderWidth: ["thin", "revert"],
      borderColor: "secondary",
      borderRadius: ["4px", "8px"],
      color: "secondary",
      textTransform: "capitalize",
      fontWeight: "500",
      fontSize: ["sm", "32px"],
      lineHeight: ["6", "8"],
      _disabled: {
        backgroundColor: "grey.100",
        borderColor: "grey.100",
        color: "grey.300",
        opacity: 1,
        _hover: {
          backgroundColor: "grey.100 !important",
          borderColor: "grey.100 !important",
          color: "grey.300 !important",
          opacity: 1,
        },
      },
      _hover: {
        opacity: 0.8,
      },
    },
  },
});
