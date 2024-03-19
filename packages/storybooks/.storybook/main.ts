const config = {
  stories: ["../src/**/*.mdx", "../packages/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework:'@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  // docs: {
  //   autodocs: "tag",
  // },
  staticDirs: ["..\\public"],
};
export default config;
