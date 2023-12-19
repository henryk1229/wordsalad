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
  onClick: () => void;
}

// renders a stylized restart button
const EnterButton: React.FC<Props> = ({ disabled, onClick }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    <UploadIcon />
  </StyledButton>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9A3334"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
  </svg>
);

export default EnterButton;
