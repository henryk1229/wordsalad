import { styled } from '../styles';

const FooterContainer = styled('div', {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
});

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        ©{' '}
        <a href="mailto:henryk1229@gmail.com" target="_blank" rel="noreferrer">
          henry koehler
        </a>
        , 2024
      </div>
    </FooterContainer>
  );
};

export default Footer;
