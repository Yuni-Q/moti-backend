import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#1A7CFF',
  colorSecondary: '#1a7cff',

  // UI
  appBg: '#f1f1f1',
  appContentBg: 'white',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#212329',
  textInverseColor: '#666A75',

  // Toolbar default and active colors
  barTextColor: 'black',
  barSelectedColor: '#1a7cff',
  barBg: 'white',

  // Form colors
  inputBorder: '#BBC0CD',
  inputTextColor: '#212329',
  inputBorderRadius: 4,

  brandTitle: '모티 디자인시스템',
  // brandImage: '',
});
