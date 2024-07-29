const path = require("path");

module.exports = function (env) {
  return {
    entry: "./script.ts",
    mode: "production",
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
        "@components": path.resolve(process.cwd(), "../../components/"),
        components: path.resolve(process.cwd(), "../../components/"),
        "@ts": path.resolve(process.cwd(), "../../ts/"),
        ts: path.resolve(process.cwd(), "../../ts/"),
        "@app": path.resolve(process.cwd(), "../../../app/"),
        "@": path.resolve(process.cwd(), "../../../app/"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "./script.js",
      path: path.resolve(__dirname),
    },
    optimization: {
      mangleExports: false,
      minimize: true,
    },
  };
};
