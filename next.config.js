/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.tobi.sh',
      'cloudflare-ipfs.com',
      'loremflickr.com'
    ]
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'argon2'];
  //   return config;
  // },
};

module.exports = nextConfig;
