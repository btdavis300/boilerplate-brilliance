/** @format */

const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.config.js");

module.exports = merge(base, {
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: false,
  cache: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  watch: false,
});