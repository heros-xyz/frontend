import { addons } from '@storybook/addons';
import theme from './herosTheme';

addons.setConfig({
  theme,
  sidebar: {
    collapsedRoots: ['to-review'],
  },
});
