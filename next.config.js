/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  // webpack: function (config, { isServer, webpack }) {
  //   // if (!isServer) {
  //   //   config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /temml/ }));
  //   // }
  //   // return config;
  // },

  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^merge$/,
      })
    );

    return config;
  },
};

if (process.env.ANALYZE) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
