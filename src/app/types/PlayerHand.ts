import { CardProps } from "@/app/types/Card";

/**
 * プレイヤー手札情報の型
 * - playerCards：プレイヤー手札
 * - currentTurn: 現在のプレイヤーのターン
 * - hintUsed: 各プレイヤーがヒントを使ったかどうかのフラグ
 * - setHintUsed: ヒント使用状態を更新する関数
 */
export type PlayerHandProps = {
  playerCards: CardProps[][];
  currentTurn: number;
  hintUsed: boolean[];
  setHintUsed: (used: boolean[]) => void;
};
