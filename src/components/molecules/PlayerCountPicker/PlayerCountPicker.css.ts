import { style, styleVariants } from '@vanilla-extract/css';

export const containerStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const labelStyle = style({
  fontSize: '1.4rem',
  fontWeight: 'bold',
  color: '#333',
});

export const buttonGroupStyle = style({
  display: 'flex',
  gap: '1.2rem',
});

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
});

export const buttonVariants = styleVariants({
  selected: {
    backgroundColor: 'rgba(0, 123, 255, 0.2)',
    color: 'black',
    border: '0.2rem solid #0056b3',
    boxShadow: '0 0 0.8rem rgba(0, 0, 0, 0.2)',
    ':hover': {
      backgroundColor: '#0056b3',
      borderColor: '#004080',
    },
  },
  unselected: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '0.2rem solid #ccc',
    boxShadow: 'none',
    ':hover': {
      backgroundColor: '#e0e0e0',
      borderColor: '#bbb',
    },
  },
});

export const iconStyle = style({
  marginRight: '0.4rem',
});

export const selectedIconStyle = style({
  filter: 'drop-shadow(0 0 0.2rem #fff)',
});
