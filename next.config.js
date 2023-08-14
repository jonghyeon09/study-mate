/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['15.164.191.112', 'studymate.fenrir-dev.link'],
  },
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
