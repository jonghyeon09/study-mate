/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV === 'development';
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isDevelopment,
  runtimeCaching: [],
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['15.164.191.112', 'studymate.fenrir-dev.link', 'k.kakaocdn.net'],
  },
  swcMinify: false,
};

module.exports = withPWA(nextConfig);
// async rewrites() {
//   return [
//     {
//       source: '/:path*',
//       destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
//     },
//   ];
// },
