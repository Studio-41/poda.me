module.exports = {
  apps: [
    {
      name: 'poda',
      script: './index.js',
      watch: true,
      env: {
        PORT: 80,
        PROTOCOL: 'https',
        PUBLIC_HOST: 'poda.me',
        STORAGE_PATH: './storage',
      },
    },
  ],
}
