import { styled } from '@stitches/react';
import Header from './header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { camelCase } from 'change-case';
import GameLayer from './GameLayer';
import HowToPlayModal from './modals/HowToPlayModal';

const URL = 'http://localhost:3000/';

const AppContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#F3EFE0',
});

export type DailySalad = {
  id: string;
  date: string;
  initialWord: string;
  par: number;
  saladNumber: number;
  solutionSet: string;
};

const initialSalad: () => DailySalad = () => ({
  id: '',
  date: new Date().toISOString(),
  initialWord: '',
  par: 6,
  saladNumber: 0,
  solutionSet: '',
});

// TODO - error handling
const fetchDailySalad = async () => {
  return await axios({
    method: 'get',
    url: URL,
  }).then((result) => {
    const { salad } = result.data;
    const camelCased: DailySalad = Object.keys(salad).reduce(
      (acc, key) => ({
        ...acc,
        [camelCase(key)]: salad[key],
      }),
      initialSalad()
    );
    return camelCased;
  });
};

export function App() {
  const [howToPlayModalOpen, setHTPModalOpen] = useState<boolean>(true);
  const [htpModalDismissed, setHTPModalDismissed] = useState<boolean>(false);

  const [dailySalad, setSalad] = useState<DailySalad>(initialSalad());

  useEffect(() => {
    if (htpModalDismissed) {
      fetchDailySalad().then((salad: DailySalad) => {
        setSalad(salad);
      });
    }
  }, [htpModalDismissed]);

  const closeModal = () => {
    setHTPModalOpen(false);
    if (!htpModalDismissed) {
      setHTPModalDismissed(true);
    }
  };

  return (
    <AppContainer>
      <Header />
      <GameLayer
        key={dailySalad.initialWord}
        dailySalad={dailySalad}
        setHTPModalOpen={setHTPModalOpen}
      />
      <HowToPlayModal open={howToPlayModalOpen} onClose={closeModal} />
    </AppContainer>
  );
}

export default App;
