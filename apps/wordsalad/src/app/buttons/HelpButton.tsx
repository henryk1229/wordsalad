import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
});

interface Props {
  onClick: () => void;
}

// renders a stylized restart button
const HelpButton: React.FC<Props> = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <HelpIcon />
  </StyledButton>
);

const HelpIcon = ({ size = 20, color = '#000000' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
export default HelpButton;
