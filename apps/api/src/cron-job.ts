import cron from 'node-cron';
import axios from 'axios';
import config from './config';

const SCHEDULE = '* 0 * * 0-6';

export const scheduleCronAndLogs = () => {
  const isValid = cron.validate(SCHEDULE);

  if (!isValid) {
    throw new Error('INVALID CRON SCHEDULE');
  }

  cron.schedule(
    SCHEDULE,
    () => {
      axios
        .post(`${config.apiUrl}/generate-salad`)
        .then((response) => {
          console.log('GENERATED SALAD:', response?.data?.initialWord);
        })
        .catch((error) => {
          console.log(`COULD NOT GENERATE SALAD: ${error.message}`);
        });
    },
    {
      name: 'generate-salad',
      timezone: 'America/New_York',
    }
  );

  const tasks = cron.getTasks();

  for (const [key] of tasks.entries()) {
    console.log('SCHEDULED TASK:', key);
  }
};
