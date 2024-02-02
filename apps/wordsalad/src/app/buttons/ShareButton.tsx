import { StyledButton, ButtonContent } from './StyledButton';

interface Props {
  onClick: () => Promise<void>;
}

// renders a stylized restart button
const ShareButton: React.FC<Props> = ({ onClick }) => (
  <StyledButton
    onClick={onClick}
    disabled={false}
    backgroundColor="#217C7E"
    margin="8px 16px"
  >
    <ButtonContent>
      <div style={{ marginRight: '8px' }}>Share</div>
      <ShareIcon size={28} />
    </ButtonContent>
  </StyledButton>
);

interface IconProps {
  size: number;
}

const ShareIcon: React.FC<IconProps> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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
