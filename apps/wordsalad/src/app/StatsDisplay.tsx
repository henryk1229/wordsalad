import { styled } from '@stitches/react';
import { Tooltip } from 'react-tooltip';
import RankingsModal from './Modals/RankingsModal';

const DisplayContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const DisplayContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Helvetica',
  fontWeight: 400,
  justifyContent: 'left',
});

const RankContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

const AttemptBadge = styled('div', {
  color: 'black',
  height: '4px',
  width: '4px',
  backgroundColor: 'black',
  margin: '4px',
  border: '2px solid black',
  borderRadius: '50%',
});

interface Props {
  attempts: string[][];
  ranking: string;
  isWordSalad: boolean;
  isLostGame: boolean;
  rankingsModalOpen: boolean;
  setRankingsModalOpen: (bool: boolean) => void;
}

const StatsDisplay: React.FC<Props> = ({
  attempts,
  ranking,
  isWordSalad,
  isLostGame,
  rankingsModalOpen,
  setRankingsModalOpen,
}) => {
  return (
    <DisplayContainer>
      <DisplayContent>
        {/* <RankContainer>
          <div
            style={{ margin: '4px', cursor: 'pointer', width: '180px' }}
            onClick={() => setRankingsModalOpen(true)}
          >
            Current Rank: <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
        </RankContainer> */}
        <AttemptsDisplay attempts={attempts} />
      </DisplayContent>
      <RankingsModal
        attempts={attempts}
        ranking={ranking}
        open={rankingsModalOpen}
        isWordSalad={isWordSalad}
        isLostGame={isLostGame}
        onClose={() => setRankingsModalOpen(false)}
      />
    </DisplayContainer>
  );
};

interface AttemptsDisplayProps {
  attempts: string[][];
}

// display past attempts and remaining attempts as badges
const AttemptsDisplay: React.FC<AttemptsDisplayProps> = ({ attempts }) => {
  // make an array of seven past attempts and any remaining attempts
  const attemptsAndRemaining = Array.from(
    Array(6),
    (_num, idx) => attempts[idx]
  );
  return (
    <div
      style={{
        display: 'flex',
        margin: '0px 32px',
        justifyContent: 'space-evenly',
      }}
    >
      {attemptsAndRemaining.map((attempt, idx) =>
        attempt ? (
          <AttemptBadge key={idx} data-tooltip-id={`attempt-tooltip-${idx}`}>
            <Tooltip id={`attempt-tooltip-${idx}`} place="bottom" opacity={0.6}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {attempt.map((word) => (
                  <div style={{ marginBottom: '2px' }} key={word}>
                    {word.toUpperCase()}
                  </div>
                ))}
              </div>
            </Tooltip>
          </AttemptBadge>
        ) : (
          <AttemptBadge
            key={idx}
            style={{
              backgroundColor: '#F3EFE0',
            }}
          />
        )
      )}
    </div>
  );
};

export default StatsDisplay;
