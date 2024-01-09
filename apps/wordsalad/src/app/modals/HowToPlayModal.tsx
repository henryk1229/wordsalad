import { styled } from '../../styles';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalHeader = styled('h3', {
  display: 'flex',
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

const ModalSubHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '#217C7E',
  fontWeight: 600,
  variants: {
    size: {
      small: {
        margin: '4px 8px 0px',
        fontSize: '15px',
      },
      medium: {
        margin: '16px 16px 0px',
        fontSize: '18px',
      },
    },
  },
});

const ModalContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  fontSize: '16px',
});

const ModalTile = styled('div', {
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
  backgroundColor: '#9A3334',
  variants: {
    size: {
      small: {
        width: '16px',
        height: '24px',
        margin: '4px 2px',
        fontWeight: 600,
        fontSize: '15px',
      },
      medium: {
        width: '32px',
        height: '40px',
        margin: '4px 2px',
        fontSize: '20px',
      },
    },
  },
});

export type GameStats = {
  date: string;
  saladNumber: number;
  attempts: number;
  ranking: string;
  initialWord: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<Props> = ({ open, onClose }) => {
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
      <ModalHeader
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        {'HOW TO PLAY'.split('').map((letter, idx) => (
          <ModalTile
            key={`${letter}-${idx}`}
            size={{
              '@initial': 'small',
              '@bp1': 'small',
              '@bp2': 'medium',
            }}
          >
            {letter}
          </ModalTile>
        ))}
      </ModalHeader>
      <ModalSubHeader
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        Complete a WordSalad in four words
      </ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li style={{ margin: '8px' }}>
            Each word must be <span style={{ fontWeight: 600 }}>five</span>{' '}
            letters
          </li>
          <li style={{ margin: '8px' }}>
            Each word must start with the{' '}
            <span style={{ fontWeight: 600 }}>last letter</span> of the
            preceding word
          </li>
          <li style={{ margin: '8px' }}>
            A letter can be used only{' '}
            <span style={{ fontWeight: 600 }}>once</span> per WordSalad
          </li>
          <li style={{ margin: '8px' }}>
            The <span style={{ fontWeight: 600 }}>number</span> next to a layer
            shows the number of words at that layer that can complete your
            WordSalad
          </li>
        </ul>
      </ModalContent>
      <ModalSubHeader
        size={{
          '@initial': 'small',
          '@bp1': 'small',
          '@bp2': 'medium',
        }}
      >
        Examples
      </ModalSubHeader>
      <ModalContent>
        <ul style={{ padding: '0px 0px 0px 16px', margin: '0px' }}>
          <li
            style={{
              margin: '12px 8px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            FRON
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              T
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              T
            </span>
            HYM
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              E
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              E
            </span>
            QUA
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              L
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              L
            </span>
            ICKS
          </li>
          <li
            style={{
              margin: '12px 8px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            BIRT
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              H
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              H
            </span>
            ONK
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              S
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              S
            </span>
            WAM
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              P
            </span>
            ,{' '}
            <span style={{ textDecoration: 'underline', color: '#217C7E' }}>
              P
            </span>
            UDGY
          </li>
        </ul>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;
