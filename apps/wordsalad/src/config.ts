import { envsafe, url } from 'envsafe';

type AppConfig = {
  apiUrl: string;
};

const env = envsafe(
  {
    API_URL: url({
      devDefault: 'http://localhost:3000',
      input: import.meta.env.VITE_API_URL,
    }),
  },
  {
    env: import.meta.env,
  }
);

const config: AppConfig = {
  apiUrl: env.API_URL,
};

export default config;
