import { styled } from '@stitches/react';

const StyledButton = styled('button', {
  border: 'none',
  backgroundColor: '#217C7E',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
  margin: '16px',
  borderRadius: '30px',
});

const ButtonContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '8px 24px',
  color: 'white',
  fontSize: 'large',
});

interface Props {
  saladNumber: number;
  attempts: number;
}

// TODO - display toast
const handleCopyResults = async (saladNumber: number, attempts: number) => {
  const text = `WordSalad ${saladNumber} ${attempts}/7`;
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const message =
      error && typeof error === 'object' && 'message' in error
        ? error.message
        : null;
    console.error(message);
  }
};

// renders a stylized restart button
const ShareButton: React.FC<Props> = ({ saladNumber, attempts }) => (
  <StyledButton onClick={() => handleCopyResults(saladNumber, attempts)}>
    <ButtonContent>
      <div style={{ marginRight: '8px' }}>Share</div>
      <ShareIcon />
    </ButtonContent>
  </StyledButton>
);

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1"
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
