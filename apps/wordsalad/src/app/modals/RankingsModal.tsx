import { styled } from '../../styles';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalHeader = styled('h3', {
  display: 'flex',
  fontSize: '20px',
  fontWeight: 800,
  variants: {
    size: {
      small: {
        margin: '8px 0px',
      },
      medium: {
        margin: '16px',
      },
    },
  },
});

const ModalSubHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '#217C7E',
  fontWeight: 600,
  variants: {
    size: {
      small: {
        margin: '4px 8px 0px',
        fontSize: '14px',
      },
      medium: {
        margin: '8px 16px 0px',
        fontSize: '16px',
      },
    },
  },
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  fontSize: '16px',
  variants: {
    size: {
      small: {
        margin: '0px',
      },
      medium: {
        margin: '8px',
      },
    },
  },
});

const ModalTile = styled('div', {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '1px 1px #751213',
  border: 'solid 1px',
  borderColor: '#9A3334 #751213 #751213 #9A3334',
  color: '#fafafa',
  margin: '4px 2px',
  backgroundColor: '#9A3334',
  variants: {
    size: {
      small: {
        width: '16px',
        height: '24px',
        fontWeight: 600,
        fontSize: '15px',
      },
      medium: {
        width: '32px',
        height: '40px',
        fontSize: '20px',
      },
    },
  },
});

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
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="stats-modal"
      aria-describedby="modal-displaying-stats"
      styles={{
        modal: {
          width: '66%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <ModalHeader
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        {'RANKINGS'.split('').map((letter, idx) => (
          <ModalTile
            key={`${letter}-${idx}`}
            size={{
              '@initial': 'small',
              '@bp1': 'small',
              '@bp2': 'medium',
            }}
          >
            {letter}
          </ModalTile>
        ))}
      </ModalHeader>
      <ModalContent
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        <ModalSubHeader
          size={{
            '@initial': 'small',
            '@bp1': 'small',
            '@bp2': 'medium',
          }}
        >
          Ranking is based on number of attempts
        </ModalSubHeader>
        <AttemptsDisplay attempts={attempts} />
        {!isLostGame && (
          <div style={{ margin: '4px 12px' }}>
            {rankingText} <span style={{ fontWeight: 'bold' }}>{ranking}</span>
          </div>
        )}
      </ModalContent>
    </Modal>
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
