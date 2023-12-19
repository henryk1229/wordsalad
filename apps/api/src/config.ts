import * as envalid from 'envalid';
const { str, num, url } = envalid;

type AppConfig = {
  isProduction: boolean;
  isTest: boolean;
  isDev: boolean;
  databaseUrl: string;
  appUrl: string;
  minPoolSize: number;
  maxPoolSize: number;
  allowedOrigins: string[];
  port: number;
};

const env = envalid.cleanEnv(process.env, {
  ALLOWED_ORIGINS: str({ devDefault: 'http://localhost:4200' }),
  DATABASE_URL: str(),
  APP_URL: url({
    devDefault: 'http://localhost:4200',
  }),
  MIN_POOL_SIZE: num({ default: 1 }),
  MAX_POOL_SIZE: num({ default: 20 }),
  PORT: num({ default: 8001 }),
});

const config: AppConfig = {
  isProduction: env.isProduction,
  isTest: env.isTest,
  isDev: env.isDev,
  databaseUrl: env.DATABASE_URL,
  appUrl: env.APP_URL,
  minPoolSize: env.MIN_POOL_SIZE,
  maxPoolSize: env.MAX_POOL_SIZE,
  allowedOrigins: env.ALLOWED_ORIGINS.split(','),
  port: env.PORT,
};

export default config;
