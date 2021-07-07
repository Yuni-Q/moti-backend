const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
      ],
    });
    config.resolve.alias = {};
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
