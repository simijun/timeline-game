import { style, styleVariants } from '@vanilla-extract/css';

export const playerHandContainerStyle = style({
  display: 'flex',
  borderRadius: '1.2rem',
  width: 'auto',
  maxWidth: '90rem',
  minHeight: '15rem',
  margin: '0 0.6rem',
  padding: '1rem 1rem',
  boxSizing: 'border-box',
});

export const playerTurnStyle = styleVariants({
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.5,
  },
});
