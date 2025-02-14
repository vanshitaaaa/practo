const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./server.js", // Entry point
  target: "node",
  externals: [nodeExternals()], // Ignore node_modules
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"] // Ensure Webpack can resolve JSX files
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
