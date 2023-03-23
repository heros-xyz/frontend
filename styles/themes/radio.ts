import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);
const primary = definePartsStyle({
  control: {
    border: "1px",
    borderColor: "primary",
    _checked: {
      border: "3px",
      background: "accent.2",
      borderColor: "accent.2",
    },
    "::before": {
      bg: "accent.1 !important",
    },
  },
});
export const Radio = defineMultiStyleConfig({ variants: { primary } });
