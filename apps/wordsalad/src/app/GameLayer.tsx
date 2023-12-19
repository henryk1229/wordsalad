import GameBoard from './GameBoard';
import { useState } from 'react';
import { DailySalad } from './app';
import { makeSolutionSets } from './utils';
import toast, { Toaster } from 'react-hot-toast';

export type UserStats = {
  played: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  prevSaladWon: number;
  prevSaladPlayed: number;
};

export const retrieveLSData = (
  saladNumber: number
): {
  storedWords: string[][];
  storedAttempts: string[][];
  storedStats: UserStats;
} => {
  // retrieve data from local storage, scoped to saladNumber
  const storedSalad =
    localStorage.getItem(saladNumber.toString()) ??
    '{ "submittedWords": [], "attempts": [] }';
  const parsed = JSON.parse(storedSalad);
  const { submittedWords, attempts } = parsed;

  const storedStats =
    localStorage.getItem('userStats') ??
    '{ "played": 0, "gamesWon": 0, "currentStreak": null, "maxStreak": null, "prevSaladWon": null, "prevSaladPlayed": null }';

  // TODO - clean up stored, submitted, played handling?
  // format data
  const storedWords: string[][] = [...submittedWords];
  const storedAttempts: string[][] = [...attempts];

  return {
    storedWords,
    storedAttempts,
    storedStats: JSON.parse(storedStats),
  };
};

// TODO - does this need to be run as an effect?
// scoped guessed words to date of salad
// const scopeSaladToDate = (dailySalad: DailySalad) => {
//   const { saladNumber } = dailySalad;
//   // split '10/25/10' from ISO string
//   const yyyyMmDd = date.split('T')[0];
//   const gameInProgress = localStorage.getItem(saladNumber.toString());

//   if (!gameInProgress) {
//     // track submitted words, scoped to game
//     localStorage.setItem(
//       saladNumber.toString(),
//       JSON.stringify({
//         submittedWords: [],
//         attempts: 1,
//       })
//     );
//   }
// };

export const getRanking = ({ numAttempts }: { numAttempts: number }) => {
  if (numAttempts >= 4) {
    return 'Good';
  }
  if (numAttempts >= 2) {
    return 'Great';
  }
  if (numAttempts <= 1) {
    return 'Perfect';
  }
  return 'Normal';
};

interface Props {
  dailySalad: DailySalad;
  setHTPModalOpen: (bool: boolean) => void;
}

const GameLayer: React.FC<Props> = ({ dailySalad, setHTPModalOpen }) => {
  const { date, saladNumber, initialWord, solutionSet } = dailySalad;

  // track stored words and attempts in localStorage
  const {
    storedWords,
    storedAttempts: pastAttempts,
    storedStats: userStats,
  } = retrieveLSData(saladNumber);

  // useEffect(() => {
  //   scopeSaladToDate(dailySalad);
  // }, [dailySalad]);

  // create rootWord[] from daily initialWord ''
  const rootWord = initialWord.split('');

  // aggregate root and stored words into one array
  const [playedWords, setPlayedWords] = useState<string[][]>(() =>
    storedWords.length > 0 ? [rootWord, ...storedWords] : [rootWord]
  );

  // aggregate attempt in play and past attempts
  const currentAttempt = playedWords.map((word) => word.join(''));
  const allAttempts = [...pastAttempts, currentAttempt];

  // make solution sets based on words played
  const solutionSets = makeSolutionSets(playedWords, solutionSet);

  const restartGame = () => {
    const { saladNumber } = dailySalad;
    // reset words and tally restart
    const latestAttempt = playedWords.map((word) => word.join(''));
    localStorage.setItem(
      saladNumber.toString(),
      JSON.stringify({
        submittedWords: [],
        attempts: [...pastAttempts, latestAttempt],
      })
    );
    // trigger refresh
    const newRoot = [...rootWord];
    setPlayedWords([newRoot]);
  };

  // this fn sets word in local storage, and set played word state
  const playNewWord = (newWord: string[]) => {
    const { saladNumber } = dailySalad;
    const stringified = JSON.stringify({
      submittedWords: [...storedWords, newWord],
      attempts: pastAttempts,
    });
    localStorage.setItem(saladNumber.toString(), stringified);
    setPlayedWords([...playedWords, newWord]);
  };

  const tallyUserStats = (isWordSalad: boolean) => {
    // get current user stats from LS
    const {
      currentStreak,
      maxStreak,
      played: prevPlayed,
      gamesWon: prevGamesWon,
      prevSaladWon,
      prevSaladPlayed,
    } = userStats;

    if (prevSaladPlayed === saladNumber) {
      // prevent incorrect stat tally when useEffect runs after gameover
      return;
    }
    // tally win stats
    if (isWordSalad) {
      const prevSaladNumber = saladNumber - 1;
      const isWinStreak =
        prevSaladWon === null ? true : prevSaladWon === prevSaladNumber;
      const isMaxStreak =
        prevSaladWon === null ? true : currentStreak === maxStreak;
      const updatedStreak = isWinStreak ? currentStreak + 1 : 1;
      const updatedMaxStreak = isMaxStreak ? maxStreak + 1 : maxStreak;
      const updatedStats = {
        played: prevPlayed + 1,
        gamesWon: prevGamesWon + 1,
        currentStreak: updatedStreak,
        maxStreak: updatedMaxStreak,
        prevSaladWon: saladNumber,
        prevSaladPlayed: saladNumber,
      };
      const stringified = JSON.stringify(updatedStats);
      return localStorage.setItem('userStats', stringified);
    }

    // tally loss stats
    const updatedStats = {
      played: prevPlayed + 1,
      gamesWon: prevGamesWon,
      currentStreak: 0,
      maxStreak,
      prevSaladWon,
      prevSaladPlayed: saladNumber,
    };
    const stringified = JSON.stringify(updatedStats);
    return localStorage.setItem('userStats', stringified);
  };

  const displayToast = () => {
    const attemptsRemaining = 7 - allAttempts.length;

    // reveal a random WordSalad on game over
    if (attemptsRemaining < 1) {
      const solutions = solutionSet.split('-');
      const setLength = solutions.length;
      // generate random number between 0 and setLength - 1
      const randomIdx = Math.floor(Math.random() * setLength);
      const randomSet = solutions[randomIdx];
      return toast(
        <div>
          {randomSet.split(',').map((word, idx) => (
            <div key={`${word}-${idx}`} style={{ margin: '4px' }}>
              {word.toUpperCase()}
            </div>
          ))}
        </div>,
        {
          id: 'gameOver',
          duration: 5000,
        }
      );
    }
    const attemptsText =
      attemptsRemaining === 1
        ? '1 attempt left'
        : `${attemptsRemaining} attempts left`;
    // display attempts remaining
    return toast(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: '8px' }}>NOT A SALAD!</div>
        <div style={{ margin: '8px' }}>{attemptsText}</div>
      </div>,
      {
        id: 'badAttempt',
      }
    );
  };

  return (
    <>
      <GameBoard
        key={playedWords.length}
        saladDate={date}
        saladNumber={saladNumber}
        ranking={getRanking({ numAttempts: allAttempts.length })}
        playedWords={playedWords}
        attempts={allAttempts}
        solutionSets={solutionSets}
        tallyUserStats={tallyUserStats}
        playNewWord={playNewWord}
        restartGame={restartGame}
        setHTPModalOpen={setHTPModalOpen}
        displayToast={displayToast}
      />
      <Toaster
        containerStyle={{ top: '120px' }}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'black',
            color: '#fafafa',
            fontFamily: 'Helvetica',
            fontSize: '18px',
          },
        }}
      />
    </>
  );
};

export default GameLayer;
