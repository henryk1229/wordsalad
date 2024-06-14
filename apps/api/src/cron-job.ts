import cron from 'node-cron';
import axios from 'axios';
import config from './config';

const SCHEDULE = '1 3 * * 0-6';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const scheduleCronAndLogs = async () => {
  const isValid = cron.validate(SCHEDULE);

  if (!isValid) {
    throw new Error('INVALID CRON SCHEDULE');
  }

  // wait for railway private network
  await sleep(5_000);

  cron.schedule(
    SCHEDULE,
    () => {
      axios
        .post(`https://${config.railwayDomain}/generate-salad`, null, {
          headers: {
            Authorization: `Bearer ${config.railwayPublicApiKey}`,
          },
        })
        .then((response) => {
          console.log('GENERATED SALAD:', response?.data?.initialWord);
        })
        .catch((error) => {
          console.log(`COULD NOT GENERATE SALAD: ${error}`);
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
