// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomWords = require('better-random-words');

// generates a random five letter word when called
export const wordGenerator = (usedWords: string[]) => {
  let generatedWords: string[] = [];
  let chosenWord: string | undefined = undefined;
  while (!chosenWord) {
    for (const word of generatedWords) {
      const letters = word.split('');
      const uniqueLetters = new Set(letters);
      if (
        word.length === 5 &&
        uniqueLetters.size === 5 &&
        !usedWords.includes(word)
      ) {
        chosenWord = word;
      }
    }
    generatedWords = randomWords({ min: 5, max: 5 });
  }
  return chosenWord;
};
