var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "time-axis.js",
    library: "TimeAxis",
    libraryTarget: "umd" //在 AMD 或 CommonJS 的 require 之后可访问
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
