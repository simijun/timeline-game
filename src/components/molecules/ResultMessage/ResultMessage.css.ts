import { style, styleVariants } from '@vanilla-extract/css';

export const resultMessageContainerStyle = style({
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '3rem 4rem',
  borderRadius: '0.8rem',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.2)',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  zIndex: 1000,
  textAlign: 'center',
  transition: 'opacity 0.3s ease',
});

export const resultMessageVisibilityStyle = styleVariants({
  visible: {
    opacity: 1,
    display: 'block',
  },
  hidden: {
    opacity: 0,
    display: 'none',
  },
});

export const closeButtonStyle = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  background: 'none',
  border: 'none',
  fontSize: '1.6rem',
  cursor: 'pointer',
});

export const gameOverTitleStyle = style({
  color: '#3f51b5',
  fontSize: '2.6rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});

export const rankingsListStyle = style({
  listStyleType: 'none',
  padding: '1rem 2rem',
  margin: 0,
  fontSize: '2rem',
  borderRadius: '1rem',
  background: 'linear-gradient(135deg, #f0f4ff, #e0e7ff)',
  boxShadow: '0 0.4rem 1.2rem rgba(0, 0, 0, 0.15)',
});

export const rankingItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 0',
  fontWeight: 'bold',
  fontSize: '1.8rem',
  transition: 'transform 0.3s',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const rankingIconStyle = style({
  color: '#3f51b5',
  marginRight: '0.8rem',
});

export const correctOrderMessageStyle = styleVariants({
  correct: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: '2.4rem',
    textTransform: 'uppercase',
  },
  incorrect: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: '2.4rem',
    textTransform: 'uppercase',
  },
});

export const drawMessageStyle = style({
  display: 'block',
  color: '#000',
  fontSize: '1.8rem',
});
