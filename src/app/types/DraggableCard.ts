import { CardProps } from "./Card";

/**
 * - card：カードの型情報
 * - index：カードの並び順
 * - isTableCard：場のカードかどうかのフラグ
 * - playerIndex：プレイヤーのインデックス（テーブルカードの場合は使用しないためオプション）
 */
export interface DraggableCardProps {
  index: number;
  card: CardProps;
  isTableCard: boolean;
  playerIndex?: number;
}
