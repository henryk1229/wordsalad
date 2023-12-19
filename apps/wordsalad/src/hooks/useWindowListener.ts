import { useEffect } from 'react';

export const useWindowListener = (
  eventType: string,
  listener: (e: Event) => void
) => {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
};
