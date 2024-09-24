import { style, styleVariants } from '@vanilla-extract/css';

// 基本のカードコンテナスタイル
export const cardContainerStyle = style({
  position: 'relative',
  cursor: 'grab',
  borderRadius: '1.2rem',
  boxShadow: '0 0.4rem 1.2rem rgba(0, 0, 0, 0.2)',
  fontSize: '0.8rem',
  padding: '0.7rem 0.7rem 0 0.7rem',
  margin: '0.4rem 1rem',
  width: '11rem',
  height: '14rem',
  backgroundColor: '#f5deb3',
  textAlign: 'center',
  transition: 'transform 0.3s ease, z-index 0.3s ease',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

// ドラッグ中のスタイル変更
export const cardDraggingStyle = styleVariants({
  dragging: {
    cursor: 'grabbing',
    transform: 'translate(0.1rem, 0.1rem)',
    opacity: 0.5,
  },
  notDragging: {
    cursor: 'grab',
    opacity: 1,
  },
});

// 画像コンテナスタイル
export const imageContainerStyle = style({
  position: 'relative',
  width: '100%',
  height: '70%',
  borderRadius: '0.8rem',
  overflow: 'hidden',
});

// イメージのスタイル
export const imageStyle = style({
  borderRadius: '0.8rem',
  objectFit: 'cover',
});

// イベントタイトルのスタイル
export const eventTitleStyle = style({
  fontSize: '0.8rem',
  color: '#333',
  fontWeight: 'bold',
  marginTop: '0.8rem',
});

// 年表示のスタイル
export const yearStyle = style({
  color: '#ff4500',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  marginTop: '0.4rem',
});
