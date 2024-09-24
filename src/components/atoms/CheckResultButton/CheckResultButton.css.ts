import { style, styleVariants } from '@vanilla-extract/css';

export const buttonBaseStyle = style({
  color: 'white',
  fontSize: '1.2rem',
  border: 'none',
  borderRadius: '1rem',
  marginLeft: '1rem',
  padding: '1rem 2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  ':active': {
    transform: 'translateY(0.1rem)',
  },
});

// 有効/無効の状態でのスタイルバリエーション
export const buttonEnabledStyle = styleVariants({
  enabled: {
    backgroundColor: '#28a745',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#218838',
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
