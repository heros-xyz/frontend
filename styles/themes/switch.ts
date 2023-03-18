import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);
const primary = definePartsStyle({
  track: {
    p: "2px",
    bg: "grey.100",
  },
  thumb: {
    _checked: {
      bg: "accent.2",
    },
  },
});

export const Switch = defineMultiStyleConfig({ variants: { primary } });
