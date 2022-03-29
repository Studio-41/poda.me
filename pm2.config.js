module.exports = {
  apps: [
    {
      name: 'poda',
      script: './index.js',
      watch: true,
      env: {
        PORT: 80,
        PUBLIC_HOST: 'poda.me',
        STORAGE_PATH: './storage',
      },
    },
  ],
}
