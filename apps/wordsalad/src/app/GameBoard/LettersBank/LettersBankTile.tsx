import { SpringValue } from '@react-spring/web';
import { styled } from '../../../styles';
import React from 'react';

const AvailableLetterTile = styled('div', {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '1px 1px #751213',
  border: 'solid 1px #751213',
  borderColor: '#9A3334 #751213 #751213 #9A3334',
  color: '#fafafa',
  margin: '4px 2px',
  backgroundColor: '#9A3334',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
  variants: {
    size: {
      small: {
        width: '24px',
        height: '32px',
      },
      medium: {
        width: '32px',
        height: '40px',
      },
    },
  },
});

const UsedLetterTile = styled(AvailableLetterTile, {
  opacity: 0.15,
});

interface Props {
  letter: string;
  isUsedLetter: boolean;
  spring?: {
    transform: SpringValue<string>;
  };
}

const LettersBankTile: React.FC<Props> = ({ letter, isUsedLetter }) => {
  return !isUsedLetter ? (
    <AvailableLetterTile
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      {letter.toUpperCase()}
    </AvailableLetterTile>
  ) : (
    <UsedLetterTile
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      {letter.toUpperCase()}
    </UsedLetterTile>
  );
};

export default LettersBankTile;
