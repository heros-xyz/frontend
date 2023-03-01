import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  header: {
    paddingBottom: "2px",
  },
  body: {
    paddingTop: "2px",
  },
  footer: {
    paddingTop: "2px",
  },
  defaultProps: {
    variant: "outline",
  },
});

const defaultProps = {
  variant: "outline",
};

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: 10,
      padding: 4,
    },
  }),
};

export const Card = defineMultiStyleConfig({ baseStyle, sizes, defaultProps });
