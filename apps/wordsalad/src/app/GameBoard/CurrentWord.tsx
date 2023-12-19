import { styled } from '../../styles';
import { useWindowListener } from '../../hooks/useWindowListener';
import WordCaddy from '../WordCaddy';

const CurrentWordContainer = styled('div', {
  display: 'flex',
  borderRadius: '3px',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  variants: {
    size: {
      small: {
        marginTop: '4px',
        height: '48px',
        width: '316px',
      },
      medium: {
        height: '84px',
        width: '400px',
      },
    },
  },
});

interface BoardProps {
  currentWord: string[];
  isLastWord: boolean;
  handleKeyboardInput: (key: string, code: string) => void;
}

const CurrentWord: React.FC<BoardProps> = ({
  currentWord,
  isLastWord,
  handleKeyboardInput,
}) => {
  // listen for keyboard input
  useWindowListener('keyup', (e: Event) => {
    if (
      'code' in e &&
      'key' in e &&
      typeof e.code === 'string' &&
      typeof e.key === 'string'
    ) {
      const { code, key } = e;
      handleKeyboardInput(key, code);
    }
  });

  return (
    <CurrentWordContainer
      autoFocus={true}
      className="currentWord"
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      <WordCaddy currentWord={currentWord} isLastWord={isLastWord} />
    </CurrentWordContainer>
  );
};

export default CurrentWord;
