import { CardProps } from "@/types/Card";

/**
 * プレイヤー手札情報の型
 * - playerCards：プレイヤー手札
 * - currentTurn: 現在のプレイヤーのターン
 * - playerIndex: 各プレイヤーのインデックス
 */
export type PlayerHandProps = {
  playerCards: CardProps[];
  currentTurn: number;
  playerIndex: number;
};
