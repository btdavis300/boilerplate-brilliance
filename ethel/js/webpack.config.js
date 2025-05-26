const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname + "/src"),
  entry: {
    index: ["./index"],
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.min.js",
    chunkFilename: "[id].bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    port: 3010,
    watchContentBase: true,
  },
  watch: false,
};
