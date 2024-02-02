import { styled } from '../../styles';
import { SubHeader, Content, ResponsiveModal } from './SharedComponents';

const AttemptBadge = styled('div', {
  color: 'black',
  height: '4px',
  width: '4px',
  backgroundColor: 'black',
  margin: '8px 8px 8px 2px',
  border: '2px solid black',
  borderRadius: '50%',
});

interface Props {
  attempts: string[][];
  ranking: string;
  open: boolean;
  isWordSalad: boolean;
  isLostGame: boolean;
  onClose: () => void;
}

const RankingsModal: React.FC<Props> = ({
  attempts,
  ranking,
  open,
  isLostGame,
  isWordSalad,
  onClose,
}) => {
  const rankingText = isWordSalad ? 'Rank:' : 'Current Rank:';
  return (
    <ResponsiveModal open={open} onClose={onClose} title="RANKINGS">
      <Content
        size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
      >
        <SubHeader
          size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
        >
          Ranking is based on number of attempts
        </SubHeader>
        <AttemptsDisplay attempts={attempts} />
        {!isLostGame && (
          <div style={{ margin: '4px 12px' }}>
            {rankingText} <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
        )}
      </Content>
    </ResponsiveModal>
  );
};

interface AttemptsDisplayProps {
  attempts: string[][];
}

const AttemptsDisplay: React.FC<AttemptsDisplayProps> = ({ attempts }) => {
  const rankingsObject: Record<number, string> = {
    1: 'Perfect',
    2: 'Great',
    4: 'Good',
    6: 'Normal',
  };
  // make an array of seven past attempts and any remaining attempts
  const attemptsAndRemaining = Array.from(
    Array(7),
    (_num, idx) => attempts[idx]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: '12px',
      }}
    >
      {attemptsAndRemaining.map((attempt, idx) =>
        attempt ? (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <AttemptBadge key={idx} />
            {rankingsObject[idx + 1]}
          </div>
        ) : (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            <AttemptBadge
              key={idx}
              style={{
                backgroundColor: '#F3EFE0',
              }}
            />
            {rankingsObject[idx + 1]}
          </div>
        )
      )}
    </div>
  );
};

export default RankingsModal;
