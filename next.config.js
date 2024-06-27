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
              value: '*', // Змініть '*' на відповідний URL вашого Android додатку в продакшені
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  