import React from 'react';
import LastPlayedWord from './LastPlayedWord';
import Tile from './Tile';
import { SpringValue, animated } from '@react-spring/web';
import { styled } from '../../../styles';

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
  setIdx: number;
  isLastPlayedWord: boolean;
  isLastTurn: boolean;
  isPendingWord: boolean;
  spring: {
    opacity: SpringValue<number>;
  };
  trails: {
    transform: SpringValue<string>;
  }[];
}

const Word: React.FC<Props> = ({
  isLastPlayedWord,
  solutionSets,
  setIdx,
  word,
  isLastTurn,
  isPendingWord,
  trails,
  spring,
}) => {
  return (
    <div
      style={{ display: 'flex', margin: '12px 0px 0px', alignItems: 'center' }}
    >
      {isLastPlayedWord ? (
        <LastPlayedWord word={word} trails={trails} isLastTurn={isLastTurn} />
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
      <Badge
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        <BadgeContents style={spring}>
          {solutionSets[setIdx]?.size ?? '0'}
        </BadgeContents>
      </Badge>
    </div>
  );
};

export default Word;
