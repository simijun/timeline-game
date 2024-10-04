import { CardProps } from "@/app/types/Card";

/**
 * 配布カード情報の型
 * - cards： 1ゲーム内で使用する山札および手札
 * - playerCount: 参加人数
 * - setCards: カード更新処理
 * - onDistribute：カード配布処理
 * - setIsCorrectOrder：正解・不正解の更新関数
 */
export type DistributeCardsProps = {
  cards: CardProps[];
  playerCount: number;
  setCards: (cards: CardProps[]) => void;
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
  setIsCorrectOrder: (value: boolean | null) => void;
};
