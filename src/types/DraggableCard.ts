import { CardProps } from "@/types/Card";

/**
 * ドラッグ可能カード情報の型
 * - card：１枚のカード
 * - index：カードの並び順
 * - isTableCard：場のカードかどうかのフラグ
 * - playerIndex：プレイヤーのインデックス（テーブルカードの場合は使用しないためオプション）
 * - isDraggable：カードがドラッグ可能かどうかのフラグ

 */
export type DraggableCardProps = {
  index: number;
  card: CardProps;
  isTableCard: boolean;
  playerIndex?: number;
  showYear: boolean;
  isDraggable: boolean;
};
