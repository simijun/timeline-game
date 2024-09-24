import { style } from '@vanilla-extract/css';

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '6rem',
  padding: '0.5rem 2rem',
  backgroundColor: '#333',
  color: 'white',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.2)',
  zIndex: 2,
  position: 'relative',
});

export const titleStyle = style({
  fontSize: '2.4rem',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: '#00bfff',
    textDecoration: 'underline',
  },
});

export const plainTitleStyle = style({
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

export const buttonGroupStyle = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

export const dropdownContainerStyle = style({
  position: 'relative',
});

export const dropdownButtonStyle = style({
  backgroundColor: '#007bff',
  color: 'white',
  padding: '1rem 2rem',
  fontSize: '1.6rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#0056b3',
  },
});

export const dropdownMenuStyle = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: 'white',
  color: '#333',
  border: '0.1rem solid #ddd',
  borderRadius: '0.5rem',
  listStyle: 'none',
  padding: 0,
  margin: '0.5rem 0 0 0',
  width: '100%',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.2)',
  zIndex: 10,
});

export const dropdownItemStyle = style({
  fontSize: '1.6rem',
  padding: '1rem 1.5rem',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#f0f0f0',
  },
});

export const ruleButtonStyle = style({
  backgroundColor: '#28a745',
  color: 'white',
  padding: '1rem 2rem',
  fontSize: '1.6rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#218838',
  },
});
