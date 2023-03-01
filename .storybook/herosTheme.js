import { create } from '@storybook/theming';
import brandImage from '../public/svg/HerosLogo.svg'

export default create({
  base: 'dark',
  brandTitle: 'Heros Storybook',
  brandImage,
  brandTarget: '_self',
  colorSecondary: '#e83657',
  appBg: '#100b34',
  appBorderColor: 'rgba(255, 255, 255, 0.5)',
  appBorderRadius: 4,
  barBg: '#100b34',
  barSelectedColor: '#e83657',
  barTextColor: '#ffffff',
});
