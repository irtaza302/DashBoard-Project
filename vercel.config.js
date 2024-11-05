module.exports = {
    generateBuildId: async () => {
      return 'build-' + Date.now();
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: 'production'
    }
  };