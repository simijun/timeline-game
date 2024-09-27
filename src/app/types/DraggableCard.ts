import { CardProps } from "./Card";

/**
 * - card：カードの型情報
 * - index：カードの並び順
 * - moveCard：カードがドロップされた時の処理
 * - isTableCard：場のカードかどうかのフラグ
 * - playerIndex：プレイヤーのインデックス
 */
export interface DraggableCardProps {
  index: number;
  card: CardProps;
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    playerIndex: number
  ) => void;
  isTableCard: boolean;
  playerIndex: number;
}
