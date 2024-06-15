import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
};

export default (() => {
  if (process.env.ANALYZE) {
    return withBundleAnalyzer(nextConfig);
  }

  return nextConfig;
})();
