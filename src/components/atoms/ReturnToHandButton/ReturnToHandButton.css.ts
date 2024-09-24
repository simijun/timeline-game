import { style, styleVariants } from '@vanilla-extract/css';

export const buttonBaseStyle = style({
  color: 'white',
  fontSize: '1.1rem',
  border: 'none',
  borderRadius: '1rem',
  marginRight: '1rem',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
  ':active': {
    transform: 'translateY(0.1rem)',
  },
});

export const buttonStateStyle = styleVariants({
  enabled: {
    backgroundColor: '#007bff',
    ':hover': {
      backgroundColor: '#0056b3',
      transform: 'translateY(-0.2rem)',
    },
  },
  disabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: '#ccc',
      transform: 'none',
    },
  },
});
