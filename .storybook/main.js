module.exports = {
  stories: ["../components/**/*.stories.@(ts|tsx)", "../modules/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  features: {
    emotionAlias: false
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: ["../public/images", "../public"]
};
