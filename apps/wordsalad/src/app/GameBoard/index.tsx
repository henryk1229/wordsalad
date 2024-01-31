import { animated } from '@react-spring/web';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import CurrentWord from './CurrentWord';
import WordsGrid from './WordsGrid';
import { useShakeWord } from '../../hooks/useShakeWord';
import axios from 'axios';
import LettersBank from './LettersBank';
import { checkSubmitConditions, makeCurrentWord } from './utils';
import StatsDisplay from '../StatsDisplay';
import DeleteButton from '../buttons/DeleteButton';
import EnterButton from '../buttons/EnterButton';
import { useWatchGameFlow } from '../../hooks/useWatchGameFlow';
import { styled } from '../../styles';
import config from '../../config';
import StatsModal from '../modals/StatsModal';
import Header from '../header';

const URL = `${config.apiUrl}/spellcheck`;

const BoardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const BoardWrapper = styled('div', {
  variants: {
    size: {
      small: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      medium: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
    },
  },
});

const WordsGridContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    size: {
      small: {
        width: '256px',
      },
      large: {
        width: '324px',
        height: '324px',
      },
    },
  },
});

const StatsDisplayContainer = styled('div', {
  display: 'flex',
  fontSize: '18px',
  justifyContent: 'center',
  alignItems: 'center',
});

const LettersBankContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  variants: {
    size: {
      small: {
        marginTop: '4px',
      },
      medium: {
        marginTop: '20px',
      },
    },
  },
});

const SpringCaddy = styled(animated.div, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    size: {
      small: {
        marginTop: '0px',
      },
      large: {
        marginTop: '16px',
      },
    },
  },
});

const spellCheckWord = async (wordArray: string[]): Promise<boolean> => {
  const submittedWord = wordArray.join('');
  return await axios({
    method: 'POST',
    url: URL,
    headers: {
      authorization: `Bearer ${config.renderApiKey}`,
    },
    data: {
      submittedWord,
    },
  }).then((result) => result.data.valid);
};

interface Props {
  saladDate: string;
  saladNumber: number;
  playedWords: string[][];
  attempts: string[][];
  ranking: string;
  solutionSets: Set<string>[];
  statsModalOpen: boolean;
  tallyUserStats: (isWordSalad: boolean) => void;
  playNewWord: (word: string[]) => void;
  restartGame: () => void;
  displayToast: () => void;
  handleShareResults: () => Promise<void>;
  setStatsModalOpen: (bool: boolean) => void;
  setHTPModalOpen: (bool: boolean) => void;
}

const GameBoard: React.FC<Props> = ({
  saladDate,
  saladNumber,
  ranking,
  playedWords,
  attempts,
  solutionSets,
  statsModalOpen,
  tallyUserStats,
  playNewWord,
  restartGame,
  displayToast,
  handleShareResults,
  setStatsModalOpen,
  setHTPModalOpen,
}) => {
  const [rankingsModalOpen, setRankingsModalOpen] = useState<boolean>(false);

  const [currentWord, setCurrentWord] = useState<string[]>(
    makeCurrentWord({
      playedWords,
    })
  );

  // springs for animations
  const { shakeStyles, shakeWord } = useShakeWord();

  const submittedLetters = playedWords.flat();
  const usedLetters = submittedLetters.concat(currentWord.flat());
  const isLastTurn = playedWords.length === 3;

  const isWordSalad = playedWords.length === 4 && playedWords[0].length > 0;
  const isLastAttempt = attempts.length >= 7;
  const isBadAttempt =
    playedWords[0]?.length > 0 && solutionSets[0]?.size === 0;
  const isLostGame = isLastAttempt && isBadAttempt;
  const disableReset = playedWords.length === 1 || isWordSalad || isLastAttempt;
  const disableSubmitDelete = !currentWord[1] || isWordSalad || isLostGame;

  // display stats modal on finish
  useWatchGameFlow({
    isWordSalad,
    isBadAttempt,
    isLostGame,
    tallyUserStats,
    displayToast,
    restartGame,
    setStatsModalOpen,
  });

  const handleSubmitWord = useCallback(async () => {
    if (isLostGame || isWordSalad) {
      return shakeWord();
    }
    const { shouldAllowSubmit } = checkSubmitConditions({
      currentWord,
      submittedLetters,
    });
    if (shouldAllowSubmit) {
      const isValidWord = await spellCheckWord(currentWord);
      if (isValidWord) {
        if (isLastTurn) {
          return playNewWord(currentWord);
        }
        // next word should start with first letter of newly-submitted current word
        const nextWord = makeCurrentWord({
          playedWords: [...playedWords, currentWord],
        });
        setCurrentWord(nextWord);
        return playNewWord(currentWord);
      }
    }
    shakeWord();
    const nextWord = makeCurrentWord({
      playedWords,
    });
    return setCurrentWord(nextWord);
  }, [
    currentWord,
    playedWords,
    submittedLetters,
    isLastTurn,
    isLostGame,
    isWordSalad,
    playNewWord,
    shakeWord,
  ]);

  const clearLetterFromCurrentWord = useCallback(() => {
    // find idx of first empty string
    const idx = currentWord.findIndex((el) => !el);
    const newWord = currentWord.slice();
    // anchor tile cannot be deleted
    if (idx > 1) {
      // replace last letter with empty string to "delete" item from array
      newWord[idx - 1] = '';
    }
    // we're deleting the last item in the array
    if (idx === -1) {
      newWord[newWord.length - 1] = '';
    }
    return setCurrentWord(newWord);
  }, [currentWord]);

  // handle non-letter input
  const handleWhiteSpaceInput = useCallback(
    (input: string) => {
      if (input === 'Backspace') {
        clearLetterFromCurrentWord();
      }
      if (input === 'Enter') {
        return handleSubmitWord();
      }
    },
    [handleSubmitWord, clearLetterFromCurrentWord]
  );

  // handle keyboard input, branch between whitespace and letter input
  const handleKeyboardInput = useCallback(
    (keyValue: string, keyCode: string) => {
      const isLetterInput = keyCode.includes('Key');
      // handle 'enter', 'delete', etc.
      if (!isLetterInput) {
        return handleWhiteSpaceInput(keyValue);
      }
      if (usedLetters.includes(keyValue)) {
        // early return to prevent reusing letters in currentWord
        return;
      }
      if (currentWord.length <= 5) {
        // add the letter to the array
        return setCurrentWord((currentWord) => {
          const idx = currentWord.findIndex((el) => !el);
          const newWord = currentWord.slice();
          newWord[idx] = keyValue;
          return newWord;
        });
      }
    },
    [handleWhiteSpaceInput, currentWord, usedLetters]
  );

  const handleClick = useCallback(
    (ev: BaseSyntheticEvent) => {
      // letters are lower case until formatted in the Tile component
      const letter = ev.target?.innerText?.toLowerCase();

      // guard against click on wrapper div
      if (letter.length > 1) {
        return;
      }

      if (currentWord.length <= 5 && !usedLetters.includes(letter)) {
        // add the letter to the array
        return setCurrentWord((currentWord) => {
          const idx = currentWord.findIndex((el) => !el);
          const newWord = currentWord.slice();
          newWord[idx] = letter;
          return newWord;
        });
      }
    },
    [currentWord.length, usedLetters]
  );

  return (
    <>
      <Header
        disableReset={disableReset}
        restartGame={restartGame}
        setHTPModalOpen={setHTPModalOpen}
        setStatsModalOpen={setStatsModalOpen}
      />
      <BoardContainer className="boardContainer">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 72px',
          }}
        >
          <StatsDisplayContainer className="statsDisplayContainer">
            <StatsDisplay
              attempts={attempts}
              ranking={ranking}
              isWordSalad={isWordSalad}
              isLostGame={isLostGame}
              rankingsModalOpen={rankingsModalOpen}
              setRankingsModalOpen={setRankingsModalOpen}
            />
          </StatsDisplayContainer>
          <BoardWrapper
            className="boardWrapper"
            size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
          >
            <WordsGridContainer
              size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'large' }}
            >
              <WordsGrid
                playedWords={playedWords}
                solutionSets={solutionSets}
              />
            </WordsGridContainer>
            <LettersBankContainer
              size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
            >
              <LettersBank usedLetters={usedLetters} onClick={handleClick} />
            </LettersBankContainer>
          </BoardWrapper>
        </div>

        <SpringCaddy
          style={{
            ...shakeStyles,
          }}
          size={{
            '@initial': 'small',
            '@bp1': 'small',
            '@bp3': 'large',
          }}
        >
          <EnterButton
            disabled={disableSubmitDelete}
            onClick={handleSubmitWord}
          />
          <CurrentWord
            currentWord={currentWord}
            isLastWord={isLastTurn}
            handleKeyboardInput={handleKeyboardInput}
          />
          <DeleteButton
            disabled={disableSubmitDelete}
            onClick={clearLetterFromCurrentWord}
          />
        </SpringCaddy>
      </BoardContainer>
      <StatsModal
        saladDate={saladDate}
        saladNumber={saladNumber}
        attempts={attempts}
        open={statsModalOpen}
        isWordSalad={isWordSalad}
        isLostGame={isLostGame}
        onClose={() => setStatsModalOpen(false)}
        handleShareResults={handleShareResults}
      />
    </>
  );
};

export default GameBoard;
