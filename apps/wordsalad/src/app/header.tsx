import { styled } from '../styles';
import { animated } from '@react-spring/web';

const APP_NAME = ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];

const HeaderContainer = styled(animated.div, {
  display: 'flex',
  padding: '8px 0px',
  justifyContent: 'space-evenly',
});

const Chip = styled('div', {
  display: 'flex',
  alignItems: 'end',
  fontFamily: 'Helvetica',
  borderBottom: 'solid 1px',
  variants: {
    size: {
      small: {
        padding: '0px',
        margin: '0px 4px',
      },
      medium: {
        marginLeft: '16px',
        padding: '8px 0px 4px 64px',
      },
    },
  },
});

const HeaderTile = styled(animated.div, {
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

const Header: React.FC = () => (
  <HeaderContainer className="header">
    <div style={{ display: 'flex' }}>
      {APP_NAME.map((letter, idx) => (
        <HeaderTile
          key={`${letter}-${idx}`}
          size={{
            '@initial': 'small',
            '@bp1': 'small',
            '@bp2': 'medium',
          }}
        >
          {letter.toUpperCase()}
        </HeaderTile>
      ))}
    </div>
    <Chip
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      by hhk
    </Chip>
  </HeaderContainer>
);

export default Header;
