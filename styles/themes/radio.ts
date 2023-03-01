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
      background: "acccent.2",
      borderColor: "acccent.2",
    },
    "::before": {
      bg: "acccent.1 !important",
    },
  },
});
export const Radio = defineMultiStyleConfig({ variants: { primary } });
