import { CardProps } from "./Card";

/**
 * - card：カードの型情報
 * - index：カードの並び順
 * - moveCard：カードがドロップされた時の処理
 */
export type DraggableCardProps = {
  card: CardProps;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};
