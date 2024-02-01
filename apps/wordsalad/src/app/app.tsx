import axios from 'axios';
import { useEffect, useState } from 'react';
import { camelCase } from 'change-case';
import GameLayer from './GameLayer';
import HowToPlayModal from './Modals/HowToPlayModal';
import config from '../config';

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
    url: config.apiUrl,
    headers: {
      authorization: `Bearer ${config.renderApiKey}`,
    },
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

  // control display of stats modal
  const [statsModalOpen, setStatsModalOpen] = useState<boolean>(false);

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
    <>
      <GameLayer
        key={dailySalad.initialWord}
        dailySalad={dailySalad}
        statsModalOpen={statsModalOpen}
        setStatsModalOpen={setStatsModalOpen}
        setHTPModalOpen={setHTPModalOpen}
      />
      <HowToPlayModal open={howToPlayModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;
