const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig(true), {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    historyApiFallback: false,
    hot: true,
    inline: true,
    port: process.env.PORT || 8080,
  },
});
