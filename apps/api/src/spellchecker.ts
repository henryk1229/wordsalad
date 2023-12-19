// eslint-disable-next-line @typescript-eslint/no-var-requires
const Typo = require('typo-js');

const dictionary = new Typo('en_us');

export const spellcheckWord = (submittedWord: string) => {
  return dictionary.check(submittedWord);
};
