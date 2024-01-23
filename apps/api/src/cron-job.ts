import cron from 'node-cron';
import axios from 'axios';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

export const cronJob = cron.schedule('* 0 * * 0-6', () => {
  axios
    .post(`http://${host}:${port}/generate-salad`)
    .then((response) => {
      console.log('GENERATED SALAD:', response?.data?.initialWord);
    })
    .catch((error) => {
      console.log(`COULD NOT GENERATE SALAD: ${error.message}`);
    }),
    {
      name: 'generate-salad',
    };
});
