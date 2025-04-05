module.exports = {
  apps: [
    {
      name: "Petow",
      script: "dist/src/main.js",
      watch: true,
      env: {
        DATABASE_LOGGING: process.env.DATABASE_LOGGING,
        JWT_SECRET: process.env.JWT_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        POSTGRES_DB: process.env.POSTGRES_DB,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        POSTGRES_USER: process.env.POSTGRES_USER
      }
    }
  ]
};
