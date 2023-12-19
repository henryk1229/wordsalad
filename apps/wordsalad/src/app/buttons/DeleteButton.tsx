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
const DeleteButton: React.FC<Props> = ({ disabled, onClick }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    <DeleteIcon />
  </StyledButton>
);

const DeleteIcon = () => (
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
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
  </svg>
);

export default DeleteButton;
