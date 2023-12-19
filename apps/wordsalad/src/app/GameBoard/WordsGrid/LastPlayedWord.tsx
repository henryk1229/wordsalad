import { SpringValue } from '@react-spring/web';
import Tile from './Tile';

interface Props {
  word: string[];
  trails: {
    transform: SpringValue<string>;
  }[];
  isLastTurn: boolean;
}
// animated on mount
const LastPlayedWord: React.FC<Props> = ({ word, trails, isLastTurn }) => {
  return (
    <>
      {trails.map((trail, idx) => {
        // first and last letters in array will be right and left bounds of board
        const isAnchorTile = isLastTurn ? idx === 0 : [0, 4].includes(idx);
        return (
          <Tile
            key={idx}
            letter={word[idx]}
            isPendingWord={false}
            isAnchorTile={isAnchorTile}
            spring={trail}
          />
        );
      })}
    </>
  );
};

export default LastPlayedWord;
