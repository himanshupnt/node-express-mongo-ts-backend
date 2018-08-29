const nodeExternals = require("webpack-node-externals");

module.exports = () => {
  return {
    mode: "production",
    devtool: "inline-source-map",
    externals: [nodeExternals()],
    target: "node",
    entry: "./src/server"
  };
};
