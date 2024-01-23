import cron from 'node-cron';
import axios from 'axios';
import config from './config';

export const cronJob = cron.schedule('* 0 * * 0-6', () => {
  axios
    .post(`${config.apiUrl}/generate-salad`)
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
