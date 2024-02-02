import { styled } from '../../styles';
import { SubHeader, Content, ResponsiveModal } from './SharedComponents';
import { retrieveLSData } from '../GameLayer';
import { DailySalad } from '../app';
import ShareButton from '../buttons/ShareButton';
import Footer from '../Footer';

const ContentWrapper = styled('div', {
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

export type SaladData = Pick<DailySalad, 'date' | 'saladNumber'>;

interface Props {
  saladDate: string;
  saladNumber: number;
  attempts: string[][];
  open: boolean;
  isWordSalad: boolean;
  isLostGame: boolean;
  onClose: () => void;
  handleShareResults: () => Promise<void>;
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
  attempts,
  open,
  isLostGame,
  isWordSalad,
  onClose,
  handleShareResults,
}) => {
  const { storedStats: userStats } = retrieveLSData(saladNumber);
  const { played, gamesWon, currentStreak, maxStreak } = userStats;

  const formattedDate = formatDate(saladDate);
  const winPercentage = played ? Math.round((gamesWon / played) * 100) : 0;
  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title={`SALAD ${saladNumber}`}
    >
      <SubHeader
        size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
      >
        {formattedDate}
      </SubHeader>
      <SubHeader
        style={{ color: 'black' }}
        size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
      >
        Statistics
      </SubHeader>
      <ContentWrapper
        size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
      >
        <Content>
          <div style={{ fontSize: '32px' }}>{played}</div>
          <div>Played</div>
        </Content>
        <Content>
          <div style={{ fontSize: '32px' }}>{winPercentage}</div>
          <div>Win % </div>
        </Content>
        <Content>
          <div style={{ fontSize: '32px' }}>{currentStreak ?? 0}</div>
          <div>Win Streak</div>
        </Content>
        <Content>
          <div style={{ fontSize: '32px' }}>{maxStreak ?? 0}</div>
          <div>Max Streak</div>
        </Content>
      </ContentWrapper>
      <ShareButton onClick={handleShareResults} />
      <Footer />
    </ResponsiveModal>
  );
};

export default StatsModal;
