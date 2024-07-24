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
    externalHost: '0.0.0.0', // Прослуховувати всі зовнішні адреси
    externalPort: 3000, // Порт, на якому працює сервер
  },
};

module.exports = nextConfig;
