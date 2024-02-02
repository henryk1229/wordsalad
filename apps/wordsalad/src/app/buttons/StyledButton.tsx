import { styled } from '../../styles';

export const Button = styled('button', {
  border: 'none',
  backgroundColor: '#F3EFE0',
  '&:hover': {
    opacity: 0.75,
    cursor: 'pointer',
  },
  borderRadius: '30px',
});

export const ButtonContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '8px 24px',
  color: 'white',
  fontSize: 'large',
});

interface Props {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactElement | React.ReactElement[];
  backgroundColor?: string;
  margin?: string;
}

export const StyledButton: React.FC<Props> = ({
  disabled,
  onClick,
  children,
  backgroundColor,
  margin,
}) => {
  const dynamicStyles = {
    ...(backgroundColor && { backgroundColor }),
    ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
    ...(margin && { margin }),
  };
  return (
    <Button onClick={onClick} disabled={disabled} style={dynamicStyles}>
      {children}
    </Button>
  );
};
