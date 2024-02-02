import { StyledButton } from './StyledButton';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

// renders a stylized restart button
const DeleteButton: React.FC<Props> = ({ disabled, onClick }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    <DeleteIcon size={30} />
  </StyledButton>
);

interface IconProps {
  size: number;
}

const DeleteIcon: React.FC<IconProps> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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
