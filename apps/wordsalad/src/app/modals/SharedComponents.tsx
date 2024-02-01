import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { styled } from '../../styles';

const Header = styled('h3', {
  display: 'flex',
  fontSize: '20px',
  fontWeight: 800,
  variants: {
    size: {
      small: {
        margin: '8px 0px',
      },
      medium: {
        margin: '16px',
      },
    },
  },
});

export const SubHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '#217C7E',
  fontWeight: 600,
  variants: {
    size: {
      small: {
        margin: '4px 8px 0px',
        fontSize: '14px',
      },
      medium: {
        margin: '8px 16px 0px',
        fontSize: '16px',
      },
    },
  },
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  fontSize: '16px',
  variants: {
    size: {
      small: {
        margin: '0px',
      },
      medium: {
        margin: '8px',
      },
    },
  },
});

const Tile = styled('div', {
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  borderRadius: '3px',
  boxShadow: '1px 1px #751213',
  border: 'solid 1px',
  borderColor: '#9A3334 #751213 #751213 #9A3334',
  color: '#fafafa',
  margin: '4px 2px',
  backgroundColor: '#9A3334',
  variants: {
    size: {
      small: {
        width: '16px',
        height: '24px',
        fontWeight: 600,
        fontSize: '15px',
      },
      medium: {
        width: '32px',
        height: '40px',
        fontSize: '20px',
      },
    },
  },
});

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactElement | React.ReactElement[];
}
export const ResponsiveModal: React.FC<Props> = ({
  open,
  title,
  onClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      aria-labelledby="end-game-modal"
      aria-describedby="modal-indicating-game-over"
      styles={{
        modal: {
          width: '66%',
          borderRadius: '3px',
          backgroundColor: '#F3EFE0',
          fontFamily: 'Helvetica',
          padding: '32px',
        },
      }}
      focusTrapped={false}
    >
      <Header size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}>
        {title.split('').map((letter, idx) => (
          <Tile
            key={`${letter}-${idx}`}
            size={{ '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' }}
          >
            {letter}
          </Tile>
        ))}
      </Header>
      {children}
    </Modal>
  );
};
