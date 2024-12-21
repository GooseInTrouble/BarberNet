/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  serverRuntimeConfig: {
    externalHost: '0.0.0.0', // Listen on all external addresses
    externalPort: 3000, // Port on which the server runs
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
