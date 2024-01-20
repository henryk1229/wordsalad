import { styled } from '../styles';

const FooterContainer = styled('div', {
  fontFamily: 'Helvetica',
  alignSelf: 'end',
  fontSize: '14px',
  variants: {
    size: {
      small: {
        position: 'fixed',
        inset: '620px 16px',
      },
      medium: {
        position: 'relative',
        inset: '0',
        marginRight: '16px',
      },
    },
  },
});

const Footer: React.FC = () => {
  return (
    <FooterContainer
      size={{
        '@initial': 'small',
        '@bp1': 'small',
        '@bp2': 'medium',
      }}
    >
      ©{' '}
      <a href="mailto:henryk1229@gmail.com" target="_blank" rel="noreferrer">
        henry koehler
      </a>
      , 2024
    </FooterContainer>
  );
};

export default Footer;
