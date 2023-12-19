import { useSpring } from '@react-spring/web';

const ZERO = 0;

export const useShakeWord = () => {
  const config = {
    friction: 12,
    tension: 240,
    velocity: 2,
  };
  const from = { x: 0 };
  const [shakeStyles, api] = useSpring(
    () => ({
      from,
    }),
    []
  );

  const shakeWord = () => {
    api.start({
      to: [
        {
          x: ZERO,
          config,
        },
        // reset spring
        {
          x: ZERO,
        },
      ],
    });
  };

  return {
    shakeStyles,
    shakeWord,
  };
};
