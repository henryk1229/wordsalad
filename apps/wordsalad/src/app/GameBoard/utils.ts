export const checkSubmitConditions = ({
  currentWord,
  submittedLetters,
}: {
  currentWord: string[];
  submittedLetters: string[];
}) => {
  const blankTileIdx = currentWord.findIndex((el) => !el);
  // check that letters in current word haven't been used, except for last letter of last word
  const nonUniqueLetters = currentWord.some((letter, idx) =>
    idx === 0 ? false : submittedLetters.includes(letter)
  );
  // check that current word has unique letters
  const currentWordRepeatsLetters =
    new Set(currentWord).size !== currentWord.length;
  // allow submit if: current word has no blank tiles, letters are unused + no letters are repeated
  const shouldAllowSubmit =
    blankTileIdx === -1 && !nonUniqueLetters && !currentWordRepeatsLetters;

  return {
    shouldAllowSubmit,
  };
};

// currentWord should start with first letter of last submittedWord
export const determineFirstLetter = (playedWords: string[][]) => {
  const lastSubmittedWord = playedWords[playedWords.length - 1];
  if (lastSubmittedWord.length < 1) {
    return '';
  }
  const letter = lastSubmittedWord[lastSubmittedWord.length - 1];
  return letter;
};

export const makeCurrentWord = ({
  playedWords,
}: {
  playedWords: string[][];
}): string[] => {
  if (playedWords.length === 4) {
    return playedWords[0];
  }
  // initialize currentWord from storedWords
  const firstLetter = determineFirstLetter(playedWords);
  return [firstLetter, '', '', '', ''];
};
