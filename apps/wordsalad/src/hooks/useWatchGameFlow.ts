import { useEffect } from 'react';

export const useWatchGameFlow = ({
  isWordSalad,
  isLostGame,
  isBadAttempt,
  tallyUserStats,
  displayToast,
  restartGame,
  setStatsModalOpen,
}: {
  isWordSalad: boolean;
  isLostGame: boolean;
  isBadAttempt: boolean;
  tallyUserStats: (isWordSalad: boolean) => void;
  displayToast: () => void;
  restartGame: () => void;
  setStatsModalOpen: (bool: boolean) => void;
}) => {
  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;
    let modalTimeout: NodeJS.Timeout;
    if (isWordSalad) {
      tallyUserStats(true);
      modalTimeout = setTimeout(() => setStatsModalOpen(true), 800);
      return;
    }
    if (isLostGame) {
      tallyUserStats(false);
      toastTimeout = setTimeout(() => displayToast(), 1800);
      modalTimeout = setTimeout(() => setStatsModalOpen(true), 2200);
      return;
    }
    if (isBadAttempt) {
      toastTimeout = setTimeout(() => displayToast(), 1600);
      modalTimeout = setTimeout(() => restartGame(), 2800);
    }
    return () => {
      toastTimeout && clearTimeout(toastTimeout);
      modalTimeout && clearTimeout(modalTimeout);
    };
  }, [
    isWordSalad,
    isBadAttempt,
    isLostGame,
    tallyUserStats,
    restartGame,
    displayToast,
    setStatsModalOpen,
  ]);
};
