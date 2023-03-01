import { viewport } from "./viewport";
import theme from "@/styles/themes/theme";
import "@/styles/scss/globals.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: {
    theme
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    expanded: true,
    sort: "requiredFirst"
  },
  viewport,
  options: {
    storySort: {
      order: ["General"]
    }
  }
};
