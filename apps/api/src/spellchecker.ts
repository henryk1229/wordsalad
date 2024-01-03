import Typo from 'typo-js';

const dictionary = new Typo('en_us');

export const spellcheckWord = (submittedWord: string) => {
  return dictionary.check(submittedWord);
};
