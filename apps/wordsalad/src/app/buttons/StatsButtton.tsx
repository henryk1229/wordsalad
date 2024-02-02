import { StyledButton } from './StyledButton';

interface Props {
  onClick: () => void;
}

// renders a stylized stats button
const StatsButton: React.FC<Props> = ({ onClick }) => (
  <StyledButton onClick={onClick} disabled={false}>
    <StatsIcon />
  </StyledButton>
);

const StatsIcon = ({ size = 20, color = '#000000' }) => (
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
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

export default StatsButton;
