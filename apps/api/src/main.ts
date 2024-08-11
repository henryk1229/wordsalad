import express from 'express';
import cors from 'cors';
import config from './config';
import { spellcheckWord } from './spellchecker';
import { query } from './db';
import { generateWordSalad } from './salad-calculator';
import { scheduleCronAndLogs } from './cron-job';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: (_, callback) => {
      callback(null, config.allowedOrigins);
    },
    preflightContinue: true,
    credentials: true,
  })
);
app.options('*', cors());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO - handle fetching errors
app.get('/', async (_req, res) => {
  const { rows } = await query({
    text: 'select * from salads order by salad_number desc limit 1',
  });
  // get the last entry from the query
  const latestSalad = rows[rows.length - 1];
  if (latestSalad) {
    res.send({ salad: latestSalad });
  }
});

app.post('/spellcheck', async (req, res) => {
  const submittedWord = req.body.submittedWord;
  const isValidWord = await spellcheckWord(submittedWord);
  res.send({ valid: isValidWord });
});

app.post('/generate-salad', async (_req, res) => {
  const { initialWord, solutionSet } = generateWordSalad();
  // insert into postgres
  const current_date = new Date();
  const yyyyMmDd = current_date.toISOString().split('T')[0];
  const formatted = `${yyyyMmDd} 00:00:00`;
  await query({
    text: 'insert into salads (initial_word, par, date, solution_set) values ($1, 6, $2, $3)',
    params: [initialWord, formatted, solutionSet],
  });
  res.send({ initialWord });
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

app.post('/update-salad', async (_req, res) => {
  const { initialWord, solutionSet } = generateWordSalad();

  // wait for railway private network
  await sleep(5_000);

  const { rows } = await query({
    text: 'select id from salads order by salad_number desc limit 1',
  });
  const id = rows[0]?.id;
  // update postgres
  await query({
    text: 'update salads set initial_word = $1, solution_set = $2 where id = $3',
    params: [initialWord, solutionSet, id],
  });
  console.log(`UPDATING SALAD: ${initialWord}`);
  res.send({ initialWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

// start cron job that auto generates the daily salad
scheduleCronAndLogs();
