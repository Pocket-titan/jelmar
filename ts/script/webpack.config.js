const path = require("path");

module.exports = {
  entry: "./script.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@components": path.resolve(process.cwd(), "../../app/components/"),
      components: path.resolve(process.cwd(), "../../app/components/"),
      "@ts": path.resolve(process.cwd(), "../../ts/"),
      "@app": path.resolve(process.cwd(), "../../app/"),
      "@": path.resolve(process.cwd(), "../../app/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "./script.js",
    path: path.resolve(__dirname),
  },
};
