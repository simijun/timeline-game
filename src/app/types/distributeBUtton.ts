import { CardProps } from "@/app/types/Card";

/**
 * 配布カード情報の型
 * - cards：複数のカード型情報の配列
 * - playerCount: 参加人数の情報型
 * - onDistribute：カード配布処理
 */
export type DistributeCardsProps = {
  cards: CardProps[];
  playerCount: number;
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
};
