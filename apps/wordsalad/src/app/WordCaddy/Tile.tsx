import { SpringValue, animated } from '@react-spring/web';
import { styled } from '../../styles';
import React from 'react';

const LetterTile = styled(animated.div, {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '2px 2px #751213',
  border: 'solid 2px',
  borderColor: '#9A3334 #751213 #751213 #9A3334',
  color: '#fafafa',
  backgroundColor: '#9A3334',
  variants: {
    size: {
      small: {
        width: '24px',
        height: '32px',
        margin: '4px 2px',
      },
      medium: {
        width: '56px',
        height: '64px',
        margin: '6px',
      },
    },
  },
});

const BlankTile = styled(LetterTile, {
  opacity: 0.15,
});

interface Props {
  letter: string;
  isAnchorTile: boolean;
  spring: {
    transform: SpringValue<string>;
  };
}

const WordCaddyTile: React.FC<Props> = ({ letter, spring, isAnchorTile }) => {
  return !letter ? (
    <BlankTile
      style={spring}
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    />
  ) : (
    <LetterTile
      style={{
        ...spring,
        ...(isAnchorTile
          ? { color: '#FFCC00' }
          : {
              color: '#fafafa',
            }),
      }}
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      {letter.toUpperCase()}
    </LetterTile>
  );
};

export default WordCaddyTile;
