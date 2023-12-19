import express from 'express';
import cors from 'cors';
import config from './config';
import { spellcheckWord } from './spellchecker';
import { query } from './db';
import { saladGenerator } from './salad-calculator';
import { wordGenerator } from './word-generator';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: (_, callback) => {
      callback(null, config.allowedOrigins);
    },
    credentials: true,
  })
);
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

app.post('/spellcheck', (req, res) => {
  const submittedWord = req.body.submittedWord;
  const isValidWord = spellcheckWord(submittedWord);
  res.send({ valid: isValidWord });
});

app.get('/generate-salad', async (_req, res) => {
  const { rows } = await query({
    text: 'select initial_word from salads',
  });
  // query existing words
  const usedWords = rows?.map((row) => row.initial_word);
  // generate unused initial word
  const initialWord = wordGenerator(usedWords);

  let solutionString: string | undefined = undefined;

  while (!solutionString) {
    // generate word salads from new word
    const wordSalads = saladGenerator(initialWord);
    if (wordSalads.length > 0) {
      solutionString = wordSalads;
    }
  }

  // catch empty solution set
  if (!solutionString) {
    throw new Error('Failed to generate a solution set');
  }

  // insert into postgres
  const current_date = new Date();
  const yyyyMmDd = current_date.toISOString().split('T')[0];
  const formatted = `${yyyyMmDd} 00:00:00`;
  await query({
    text: 'insert into salads (initial_word, par, date, solution_set) values ($1, 6, $2, $3)',
    params: [initialWord, formatted, solutionString],
  });
  res.send({ initialWord });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
