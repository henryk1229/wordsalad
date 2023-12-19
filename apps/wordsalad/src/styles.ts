import { createStitches } from '@stitches/react';

export const { styled } = createStitches({
  media: {
    bp1: '(min-width: 320px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
});
