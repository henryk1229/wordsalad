import { styled } from '../../styles';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { retrieveLSData } from '../GameLayer';
import { DailySalad } from '../app';

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
        margin: '8px',
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

const ModalContentWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  variants: {
    size: {
      small: {
        margin: '0px 4px',
        fontSize: '12px',
      },
      medium: {
        margin: '8px 16px',
        fontSize: '16px',
      },
    },
  },
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  backgroundColor: '#9A3334',
  variants: {
    size: {
      small: {
        width: '16px',
        height: '24px',
        margin: '4px 2px',
        fontWeight: 600,
        fontSize: '15px',
      },
      medium: {
        width: '32px',
        height: '40px',
        margin: '4px 2px',
        fontSize: '20px',
      },
    },
  },
});

export type SaladData = Pick<DailySalad, 'date' | 'saladNumber'>;

interface Props {
  saladDate: string;
  saladNumber: number;
  open: boolean;
  isWordSalad: boolean;
  isLostGame: boolean;
  onClose: () => void;
}

const getSuffix = (lastDigit: string) => {
  const asNumber = parseInt(lastDigit, 10);
  // 1st, 2nd, 3rd
  if (asNumber === 1) {
    return 'st';
  }
  if (asNumber === 2) {
    return 'nd';
  }
  if (asNumber === 3) {
    return 'rd';
  }

  // 4th, 5th, 6th, 10th
  return 'th';
};
// take '2023-10-19T04:00:00' and return October 19th, 2023
const formatDate = (date: string) => {
  const splitYear = date.split('-');
  const year = splitYear[0];
  const numberedMonth = splitYear[1];
  const monthMap: { [x: string]: string } = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };
  const month = monthMap[numberedMonth];
  const numberedDay = splitYear[2]?.split('T')[0];
  const splitDay = numberedDay.split('');
  const lastDigit = splitDay[splitDay.length - 1];
  const suffix = getSuffix(lastDigit);
  return `${month} ${numberedDay}${suffix}, ${year}`;
};

const StatsModal: React.FC<Props> = ({
  saladDate,
  saladNumber,
  open,
  isLostGame,
  isWordSalad,
  onClose,
}) => {
  const { storedStats: userStats } = retrieveLSData(saladNumber);
  const { played, gamesWon, currentStreak, maxStreak } = userStats;

  const formattedDate = formatDate(saladDate);
  const winPercentage = played ? Math.round((gamesWon / played) * 100) : 0;
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
        {`SALAD ${saladNumber}`.split('').map((letter, idx) => (
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
      <ModalSubHeader
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        {formattedDate}
      </ModalSubHeader>
      <ModalSubHeader
        style={{ color: 'black' }}
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        Statistics
      </ModalSubHeader>
      <ModalContentWrapper
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        <ModalContent>
          <div style={{ fontSize: '32px' }}>{played}</div>
          <div>Played</div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '32px' }}>{winPercentage}</div>
          <div>Win % </div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '32px' }}>{currentStreak ?? 0}</div>
          <div>Win Streak</div>
        </ModalContent>
        <ModalContent>
          <div style={{ fontSize: '32px' }}>{maxStreak ?? 0}</div>
          <div>Max Streak</div>
        </ModalContent>
      </ModalContentWrapper>
    </Modal>
  );
};

export default StatsModal;
