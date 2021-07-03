/* eslint-disable */
const Dotenv = require('dotenv-webpack');
/* eslint-enable */

module.exports = {
  compress: true,
  distDir: '.next',
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const { module = {}, plugins = [] } = config;
    const newConfig = {
      ...config,
      mode: prod ? 'production' : 'development',
      output: {
        ...config.output,
        publicPath: '/_next/',
      },
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
              name: '[hash].[ext]',
            },
          },
          {
            test: /\.(s[ac]ss|css)$/i,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
        ],
      },
      plugins: [
        ...plugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new Dotenv({ silent: true }),
      ],
    };
    if (prod) {
      newConfig.devtool = 'hidden-source-map';
    }
    return newConfig;
  },
};
