const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfig(false), {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: path.resolve('.cache'),
        parallel: 4,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
  ],
});
