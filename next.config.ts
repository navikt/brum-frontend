/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['highcharts'],
  experimental: {
    esmExternals: 'loose',
  },
  // reactStrictMode: true,
  // assetPrefix:
  //   process.env.NODE_ENV === "production"
  //     ? "https://cdn.nav.no/brum"
  //     : undefined,
};

export default nextConfig;
