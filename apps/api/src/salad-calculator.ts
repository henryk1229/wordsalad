import { make_word_salad } from 'wordsalad-calculator';
import { query } from './db';
import { wordGenerator } from './word-generator';

const makeDifficultySettings = () => {
  const difficultyMap = {
    EASY: [50, 600],
    MEDIUM: [20, 50],
    HARD: [10, 20],
    EXTRA: [1, 10],
  };
  // 0 = Sunday... 6 = Saturday
  const daysMap = {
    0: difficultyMap['EASY'],
    1: difficultyMap['EASY'],
    2: difficultyMap['EASY'],
    3: difficultyMap['EASY'],
    4: difficultyMap['EASY'],
    5: difficultyMap['MEDIUM'],
    6: difficultyMap['MEDIUM'],
  };
  return {
    daysMap,
  };
};

export const generateWordSalad = async () => {
  const { rows } = await query({
    text: 'select initial_word from salads',
  });
  // query existing words
  const usedWords = rows?.map((row) => row.initial_word);
  // generate unused initial word
  const { daysMap } = makeDifficultySettings();
  let initialWord = wordGenerator(usedWords);
  let solutionString: string | undefined = undefined;
  while (!solutionString) {
    // generate wordSalad with solution number mapped to day of the week
    const wordSalads = make_word_salad(initialWord);
    const solutions = wordSalads.split('-');
    const weekday = new Date().getDay();
    const [min, max] = daysMap[weekday];
    if (wordSalads && solutions.length >= min && solutions.length <= max) {
      solutionString = wordSalads;
    } else {
      initialWord = wordGenerator(usedWords);
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
