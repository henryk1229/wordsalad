import GuideLine from './GuideLine';
import {
  animated,
  useSpring,
  useSpringRef,
  useTrail,
  useChain,
  easings,
} from '@react-spring/web';
import Word from './Word';

interface Props {
  playedWords: string[][];
  solutionSets: Set<string>[];
}

const makeWordsGrid = (playedWords: string[][]): string[][] => {
  const emptyGrid = ['', '', '', '', ''];
  // we haven't fetched the initial word yet, return a skeleton grid
  if (playedWords[0] && playedWords[0].length === 0) {
    return [emptyGrid, emptyGrid, emptyGrid, emptyGrid];
  }
  // the game is over, don't insert pending and empty words
  if (playedWords.length > 3) {
    return playedWords;
  }
  // prevent mutation of original array
  const wordsGrid = playedWords.slice();
  // add empty words to make grid length 4
  let numToAdd = 4 - playedWords.length;
  do {
    numToAdd -= 1;
    wordsGrid.push(emptyGrid);
  } while (numToAdd > 0);
  // creating pending word with letters from last played word
  const insertIdx = playedWords.length;
  const firstLetter = playedWords[playedWords.length - 1][4];
  const grid = [firstLetter, '', '', '', ''];
  wordsGrid[insertIdx] = grid;
  return wordsGrid;
};

const WordsGrid: React.FC<Props> = ({ playedWords, solutionSets }) => {
  const trailsRef = useSpringRef();
  const trails = useTrail(5, {
    ref: trailsRef,
    from: { transform: 'scale(0.7)' },
    to: {
      transform: 'scale(1)',
    },
    config: {
      duration: 180,
    },
  });
  const springRef = useSpringRef();
  const spring = useSpring({
    ref: springRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1200,
      easing: easings.easeInBack,
    },
  });

  useChain([trailsRef, springRef]);

  return makeWordsGrid(playedWords).map((word: string[], wordIdx: number) => (
    <animated.div
      style={{ display: 'flex', flexDirection: 'column' }}
      key={wordIdx}
    >
      <Word
        isLastPlayedWord={wordIdx === playedWords.length - 1}
        solutionSets={solutionSets}
        wordIdx={wordIdx}
        word={word}
        numWordsPlayed={playedWords.length}
        trails={trails}
        spring={spring}
      />
      {wordIdx !== 3 && <GuideLine />}
    </animated.div>
  ));
};

export default WordsGrid;
