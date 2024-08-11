import { make_word_salad } from 'wordsalad-calculator';

export const generateWordSalad = () => {
  const solutionSet = make_word_salad();
  const initialWord = solutionSet.slice(0, 5);
  return {
    initialWord,
    solutionSet,
  };
};
