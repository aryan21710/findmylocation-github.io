const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  return {
    mode: "production",
    entry: path.join(__dirname, "src/App.js"),
    devServer: {
      contentBase: path.join(__dirname, "public"),
      hot: true,
      inline: true,
      historyApiFallback: true,
      watchContentBase: true,
      port: 8001
    },
    output: {
      path: path.join(__dirname, "public",),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
          loader: "url-loader"
        }
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  };
};