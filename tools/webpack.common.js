const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

module.exports = (devMode) => {
  return {
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      path: path.join(__dirname, '../dist'),
      chunkFilename: '[name].chunk.js',
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'eslint-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.(css)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { hmr: devMode, reloadAll: devMode } },
            'happypack/loader?id=happyStyle',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          exclude: /node-modules/,
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: '[name].[hash:4].[ext]',
            outputPath: 'images/',
          },
        },
        {
          test: /\.(woff|eot|ttf)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name].[hash:4].[ext]',
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
      },
      runtimeChunk: true,
      minimize: false,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? 'css/style.css' : 'css/style.[contenthash].css',
        chunkFilename: devMode ? 'css/style.[id].css' : 'css/style.[contenthash].[id].css',
      }),
      new HappyPack({
        id: 'happyStyle',
        loaders: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }),
    ],
  };
};
