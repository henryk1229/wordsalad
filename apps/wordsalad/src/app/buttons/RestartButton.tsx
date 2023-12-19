import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
});

interface Props {
  disabled: boolean;
  restartGame: () => void;
}

// renders a stylized restart button
const RestartButton: React.FC<Props> = ({ disabled, restartGame }) => (
  <StyledButton
    onClick={restartGame}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    <div style={{ marginLeft: '4px' }}>
      <RestartIcon />
    </div>
  </StyledButton>
);

const RestartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9A3334"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
  </svg>
);

export default RestartButton;
