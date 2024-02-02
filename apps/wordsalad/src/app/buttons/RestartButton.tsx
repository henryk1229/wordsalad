import { StyledButton } from './StyledButton';

interface Props {
  disabled: boolean;
  restartGame: () => void;
}

// renders a stylized restart button
const RestartButton: React.FC<Props> = ({ disabled, restartGame }) => (
  <StyledButton onClick={restartGame} disabled={disabled}>
    <RestartIcon />
  </StyledButton>
);

const RestartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
  </svg>
);

export default RestartButton;
