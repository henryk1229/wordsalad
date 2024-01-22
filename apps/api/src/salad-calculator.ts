import { make_word_salad } from 'salad_calculator';
import { query } from './db';
import { wordGenerator } from './word-generator';

export const generateWordSalad = async () => {
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
    const wordSalads = make_word_salad(initialWord);
    if (wordSalads.length > 0) {
      solutionString = wordSalads;
    }
  }

  // catch empty solution set
  if (!solutionString) {
    throw new Error('Failed to generate a solution set');
  }
  return {
    initialWord,
    solutionSet: solutionString,
  };
};
