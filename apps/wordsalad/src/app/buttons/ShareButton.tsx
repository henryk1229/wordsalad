import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#217C7E',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
  margin: '4px 0px',
});

interface Props {
  disabled: boolean;
  onClick: () => void;
}

// renders a stylized restart button
const ShareButton: React.FC<Props> = ({ disabled, onClick }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    style={{
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : null),
    }}
  >
    <ShareIcon />
  </StyledButton>
);

const ShareIcon = () => (
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
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

export default ShareButton;
