import { CardProps } from "./Card";

/**
 * - card：カードの型情報
 * - index：カードの並び順
 * - moveCardToTable：プレイヤーの手札からBoardにカードがドロップされた時の処理
 * - isTableCard：場のカードかどうかのフラグ
 * - playerIndex：プレイヤーのインデックス（オプション）
 */
export interface DraggableCardProps {
  index: number;
  card: CardProps;
  moveCardToTable: (
    dragIndex: number,
    hoverIndex: number,
    playerIndex: number
  ) => void;
  isTableCard: boolean;
  playerIndex?: number; // テーブルカードの場合は使用しないためオプション
}
