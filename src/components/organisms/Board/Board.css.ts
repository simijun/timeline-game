import { style, styleVariants } from '@vanilla-extract/css';

// メインコンテナスタイル
export const boardContainerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '65vw',
  height: '19rem',
  backgroundImage: 'url("/images/board-image.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12.5rem / 12.5rem',
  padding: '1rem',
  paddingLeft: '7rem',
  paddingRight: '7rem',
  transition: 'all 0.3s ease',
});

// `isOver` に基づくボックスシャドウとボーダースタイル
export const boardContainerVariants = styleVariants({
  default: {
    boxShadow: '0 0 1.5rem rgba(0, 0, 0, 0.5)',
    border: '0.8rem solid white',
  },
  isOver: {
    boxShadow: '0 0 2rem rgba(0, 255, 255, 0.6)',
    border: '0.8rem solid #00bfff',
  },
});

// 内部のカードリストスタイル
export const cardListStyle = style({
  display: 'inline-flex',
  overflowX: 'auto',
  overflowY: 'hidden',
});
