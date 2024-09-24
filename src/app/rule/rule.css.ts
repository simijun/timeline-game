import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  maxWidth: '80rem',
  margin: '5rem auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '0.8rem',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.1)',
});

export const headerStyle = style({
  textAlign: 'center',
  marginBottom: '2rem',
});

export const titleStyle = style({
  fontSize: '3.2rem',
  fontWeight: 'bold',
  color: '#333',
});

export const sectionStyle = style({
  marginBottom: '3rem',
});

export const sectionTitleStyle = style({
  fontSize: '2.4rem',
  fontWeight: 'bold',
  color: '#555',
  marginBottom: '1rem',
});

export const paragraphStyle = style({
  fontSize: '1.6rem',
  color: '#666',
  lineHeight: 1.6,
});

export const buttonContainerStyle = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '3rem',
});

export const buttonStyle = style({
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
