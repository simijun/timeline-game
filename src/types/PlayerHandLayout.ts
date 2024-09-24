import { CardProps } from "@/types/Card";

/**
 * 手札レイアウト情報の型
 * - playerCards：プレイヤー手札
 * - playerCount: 参加人数
 * - currentTurn: 現在のプレイヤーのターン
 */
export type PlayerHandLayoutProps = {
  playerCards: CardProps[][];
  playerCount: number;
  currentTurn: number;
};
