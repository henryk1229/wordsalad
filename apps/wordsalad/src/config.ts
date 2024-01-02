import { envsafe, url, str } from 'envsafe';

type AppConfig = {
  apiUrl: string;
  renderApiKey: string;
};

const env = envsafe(
  {
    API_URL: url({
      devDefault: 'http://localhost:3000',
      input: import.meta.env.VITE_API_URL,
    }),
    RENDER_API_KEY: str(),
  },
  {
    env: import.meta.env,
  }
);

const config: AppConfig = {
  apiUrl: env.API_URL,
  renderApiKey: env.RENDER_API_KEY,
};

export default config;
