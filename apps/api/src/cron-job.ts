import cron from 'node-cron';
import axios from 'axios';
import config from './config';

const host = config.railwayInternalHost ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

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
        .post(`http://${host}:${port}/generate-salad`)
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
