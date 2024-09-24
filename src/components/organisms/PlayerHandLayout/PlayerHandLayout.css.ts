import { style, styleVariants } from '@vanilla-extract/css';

export const playerHandContainerStyle = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  left: '50%',
  transform: 'translateX(-50%)',
});

export const playerHandVariants = styleVariants({
  top: {
    top: '-80%',
  },
  bottom: {
    bottom: '-80%',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});
