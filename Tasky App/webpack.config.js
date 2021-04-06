var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
const defaultInclude = path.resolve(__dirname, "src");

var nodeModules = {};
fs.readdirSync("node_modules")
  .filter(function (x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
  mode: "development",
  externals: nodeModules,
  entry: ["./src/index.js"],
  target: "node",
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    port: 4172,
  },
};
