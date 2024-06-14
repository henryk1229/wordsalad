// const { generate } = await import('random-words');
const TEMP_LIST = [
  'grain',
  'front',
  'spite',
  'smoke',
  'birth',
  'spent',
  'acres',
  'human',
  'swung',
  'close',
  'bound',
  'snake',
  'claws',
  'curve',
  'sharp',
  'learn',
  'bring',
  'depth',
  'trunk',
];
// generates a random five letter word when called
export const wordGenerator = (usedWords: string[]) => {
  // let chosenWord: string | undefined = undefined;
  // while (!chosenWord) {
  //   const generatedWords = generate({ exactly: 5, minLength: 5, maxLength: 5 });
  //   for (const word of generatedWords) {
  //     const letters = word.split('');
  //     const uniqueLetters = new Set(letters);
  //     if (
  //       word.length === 5 &&
  //       uniqueLetters.size === 5 &&
  //       !usedWords.includes(word) &&
  //       !word.endsWith('x')
  //     ) {
  //       chosenWord = word;
  //     }
  //   }
  // }
  // return chosenWord;

  return TEMP_LIST.shift();
};
