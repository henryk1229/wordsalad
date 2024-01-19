import React from 'react';
import LastPlayedWord from './LastPlayedWord';
import Tile from './Tile';
import { SpringValue, animated } from '@react-spring/web';
import { styled } from '../../../styles';

const SALAD_EMOJI = (
  <span role="img" aria-label="cucumber" style={{ fontSize: '18px' }}>
    🥗
  </span>
);
const CUKE_EMOJI = (
  <span role="img" aria-label="cucumber" style={{ fontSize: '18px' }}>
    🥒
  </span>
);
const GREENS_EMOJI = (
  <span role="img" aria-label="cucumber" style={{ fontSize: '18px' }}>
    🥬
  </span>
);

const BELL_PEPPER_EMOJI = (
  <span role="img" aria-label="cucumber" style={{ fontSize: '18px' }}>
    🫑
  </span>
);

const INGREDIENTS = [GREENS_EMOJI, CUKE_EMOJI, BELL_PEPPER_EMOJI, SALAD_EMOJI];

const Badge = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  border: '2px solid black',
  borderRadius: '50%',
  variants: {
    size: {
      small: {
        height: '24px',
        width: '24px',
        marginLeft: '4px',
      },
      medium: {
        height: '32px',
        width: '32px',
        marginLeft: '12px',
      },
    },
  },
});

const BadgeContents = styled(animated.div, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  color: 'black',
  fontSize: '12px',
});

interface Props {
  word: string[];
  solutionSets: Set<string>[];
  wordIdx: number;
  numWordsPlayed: number;
  isLastPlayedWord: boolean;
  spring: {
    opacity: SpringValue<number>;
  };
  trails: {
    transform: SpringValue<string>;
  }[];
}

const Word: React.FC<Props> = ({
  isLastPlayedWord,
  numWordsPlayed,
  solutionSets,
  wordIdx,
  word,
  trails,
  spring,
}) => {
  const isPendingWord = !!word[0] && !word[1];

  // display emoji or "-" if the word is not a salad
  const playedWordsBadges = Array.from({ length: numWordsPlayed }, (_v, i) =>
    i === numWordsPlayed - 1
      ? solutionSets[0]?.size === 0
        ? '-'
        : INGREDIENTS[i]
      : INGREDIENTS[i]
  );

  // display emojis + remaining solution numbers
  const badgeContents = [
    ...playedWordsBadges,
    ...solutionSets.map((set) => (set.size === 0 ? '-' : set.size)),
  ];

  const shouldApplySpring =
    numWordsPlayed !== 4 ? wordIdx >= numWordsPlayed - 1 : false;

  return (
    <div
      style={{ display: 'flex', margin: '12px 0px 0px', alignItems: 'center' }}
    >
      {isLastPlayedWord ? (
        <LastPlayedWord
          word={word}
          trails={trails}
          isLastTurn={numWordsPlayed >= 3}
        />
      ) : (
        word.map((letter, letterIdx) => (
          <Tile
            key={letterIdx}
            letter={letter}
            isPendingWord={isPendingWord}
            isAnchorTile={[0].includes(letterIdx)}
          />
        ))
      )}
      <Badge size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}>
        <BadgeContents style={{ ...(shouldApplySpring && { ...spring }) }}>
          {badgeContents[wordIdx]}
        </BadgeContents>
      </Badge>
    </div>
  );
};

export default Word;
