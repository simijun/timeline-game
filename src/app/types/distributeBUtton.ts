import { CardProps } from "@/app/types/Card";

/**
 * - cards：複数のカード型情報の配列
 * - onDistribute：カード配布処理
 */
export type DistributeCardsProps = {
  cards: CardProps[];
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
};
