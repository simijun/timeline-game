import { CardProps } from "@/app/types/Card";

/**
 * プレイヤー手札情報の型
 * - playerCards：プレイヤー手札
 * - currentTurn: 現在のプレイヤーのターン
 */
export type PlayerHandProps = {
  playerCards: CardProps[][];
  currentTurn: number;
};
