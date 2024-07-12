const TEMP_LIST = [
  'strip',
  'doubt',
  'angle',
  'meant',
  'train',
  'chest',
  'whale',
  'chief',
  'worth',
  'lucky',
  'slope',
  'clear',
  'plane',
  'porch',
  'being',
  'pound',
  'sight',
  'drink',
  'parts',
  'movie',
  'empty',
  'candy',
  'dance',
  'music',
  'exist',
  'earth',
  'pilot',
  'found',
  'water',
  'taken',
  'noted',
  'quick',
  'dozen',
  'group',
  'ankle',
  'chose',
  'avoid',
  'bleak',
  'zebra',
  'count',
  'truck',
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

  const idx = Math.floor(Math.random() * TEMP_LIST.length);

  return TEMP_LIST[idx];
};
