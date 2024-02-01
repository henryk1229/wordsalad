import { SubHeader, Content, ResponsiveModal } from './SharedComponents';

const inlineStyles = {
  ul: { padding: '0px 0px 0px 16px', margin: '0px' },
  li: { margin: '12px 8px', fontWeight: 600, letterSpacing: '1px' },
  span: { textDecoration: 'underline', color: '#217C7E' },
  bps: { '@initial': 'small', '@bp1': 'small', '@bp2': 'medium' } as const,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <ResponsiveModal open={open} onClose={onClose} title={'WORDSALAD'}>
      <SubHeader size={inlineStyles.bps}>
        Complete a WordSalad in four words
      </SubHeader>
      <Content>
        <ul style={inlineStyles.ul}>
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
            The <span style={{ fontWeight: 600 }}>number</span> next to each
            layer shows how many words at that layer can complete your WordSalad
          </li>
        </ul>
      </Content>
      <SubHeader size={inlineStyles.bps}>Examples</SubHeader>
      <Content>
        <ul style={inlineStyles.ul}>
          <li style={inlineStyles.li}>
            FRON
            <span style={inlineStyles.span}>T</span>,{' '}
            <span style={inlineStyles.span}>T</span>
            HYM
            <span style={inlineStyles.span}>E</span>,{' '}
            <span style={inlineStyles.span}>E</span>
            QUA
            <span style={inlineStyles.span}>L</span>,{' '}
            <span style={inlineStyles.span}>L</span>
            ICKS
          </li>
          <li style={inlineStyles.li}>
            BIRT
            <span style={inlineStyles.span}>H</span>,{' '}
            <span style={inlineStyles.span}>H</span>
            ONK
            <span style={inlineStyles.span}>S</span>,{' '}
            <span style={inlineStyles.span}>S</span>
            WAM
            <span style={inlineStyles.span}>P</span>,{' '}
            <span style={inlineStyles.span}>P</span>
            UDGY
          </li>
        </ul>
      </Content>
    </ResponsiveModal>
  );
};

export default HowToPlayModal;
