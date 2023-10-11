import { library } from '@fortawesome/fontawesome-svg-core';
import type { Preview } from "@storybook/react";
import '../src/styles/index.scss'
import { fas } from '@fortawesome/free-solid-svg-icons'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewMode: 'docs'
  },
};

export default preview;
