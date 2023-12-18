import { make_word_salad } from 'salad_calculator';

// generates a random five letter word when called
export const saladGenerator = (initialWord: string) => {
  return make_word_salad(initialWord);
};
