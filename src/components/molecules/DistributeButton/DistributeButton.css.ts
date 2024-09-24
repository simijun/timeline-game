import { style } from '@vanilla-extract/css';

export const buttonBaseStyle = style({
  backgroundColor: '#28a745',
  color: 'white',
  padding: '1.2rem 2.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  boxShadow: '0 0.4rem 1rem rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#218838',
    transform: 'translateY(-0.3rem)',
    boxShadow: '0 0.6rem 1.5rem rgba(0, 0, 0, 0.3)',
  },
  ':active': {
    transform: 'translateY(0.1rem)',
  },
});
