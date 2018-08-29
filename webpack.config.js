const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "development", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      target: "node",
      module: {
        rules: [
          {
            test: /\.ts?$/,
            use: "ts-loader",
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: [".ts", ".js"]
      },
      node: {
        // console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
      },
      plugins: [new CleanWebpackPlugin(["dist"]), new webpack.ProgressPlugin()],
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
      }
    },
    modeConfig(mode)
  );
};
