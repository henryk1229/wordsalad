import { styled } from '../styles';
import HelpButton from './buttons/HelpButton';
import StatsButton from './buttons/StatsButtton';

const HeaderContainer = styled('div', {
  display: 'flex',
  padding: '8px',
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
        marginLeft: '16px',
        padding: '8px 0px 4px 64px',
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
  isSmallScreen: boolean;
  setHTPModalOpen: (bool: boolean) => void;
  setStatsModalOpen: (bool: boolean) => void;
}

const Header: React.FC<Props> = ({
  isSmallScreen,
  setHTPModalOpen,
  setStatsModalOpen,
}) => {
  const appName = isSmallScreen
    ? ['w', 'r', 'd', 's', 'l', 'd']
    : ['w', 'o', 'r', 'd', 's', 'a', 'l', 'a', 'd'];
  return (
    <HeaderContainer className="header">
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
      </Chip>
    </HeaderContainer>
  );
};

export default Header;
