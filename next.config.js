/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['15.164.191.112', 'studymate.fenrir-dev.link'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
