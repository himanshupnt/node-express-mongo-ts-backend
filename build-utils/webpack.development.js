const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    devtool: "inline-source-map",
    externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
    target: "node",
    entry: ["webpack/hot/poll?1000", "./src/dev-server"],
    plugins: [
      new StartServerPlugin("bundle.js"),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
