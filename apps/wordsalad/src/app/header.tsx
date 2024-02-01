import { styled } from '../styles';
import HelpButton from './buttons/HelpButton';
import RestartButton from './buttons/RestartButton';
import StatsButton from './buttons/StatsButtton';

const HeaderContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const Chip = styled('div', {
  display: 'flex',
  alignItems: 'end',
  fontFamily: 'Helvetica',
  borderBottom: 'solid 1px',
  variants: {
    size: {
      small: {
        padding: '2px',
        margin: '2px',
      },
      medium: {
        padding: '8px',
      },
    },
  },
});

const HeaderTile = styled('div', {
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
        margin: '2px',
      },
      medium: {
        width: '56px',
        height: '64px',
        margin: '6px',
      },
    },
  },
});

interface Props {
  disableReset: boolean;
  restartGame: () => void;
  setHTPModalOpen: (bool: boolean) => void;
  setStatsModalOpen: (bool: boolean) => void;
}

const Header: React.FC<Props> = ({
  disableReset,
  restartGame,
  setHTPModalOpen,
  setStatsModalOpen,
}) => {
  const isSmallScreen = window?.matchMedia('(max-width: 400px)')?.matches;
  const appName = isSmallScreen
    ? ['w', 'r', 'd', 's', 'l', 'd']
    : ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];
  const justifyContent = isSmallScreen
    ? { justifyContent: 'space-evenly' }
    : { justifyContent: 'center' };
  return (
    <HeaderContainer className="header" style={{ ...justifyContent }}>
      <div style={{ display: 'flex' }}>
        {appName.map((letter, idx) => (
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
        <StatsButton onClick={() => setStatsModalOpen(true)} />
        <HelpButton onClick={() => setHTPModalOpen(true)} />
        <RestartButton restartGame={restartGame} disabled={disableReset} />
      </Chip>
    </HeaderContainer>
  );
};

export default Header;
