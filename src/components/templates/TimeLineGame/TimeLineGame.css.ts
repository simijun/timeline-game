import { style } from '@vanilla-extract/css';

export const rootContainerStyle = style({
  display: 'flex',
  height: 'calc(100vh - 6rem)',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f0f0f0',
});

export const gameContentStyle = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const toolbarContainerStyle = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  gap: '2rem',
});

export const buttonContainerStyle = style({
  display: 'flex',
  gap: '1rem',
});
