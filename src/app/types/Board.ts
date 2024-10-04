import { CardProps } from "@/app/types/Card";

/**
 * Board情報の型
 * - cards: 1ゲーム内で使用する山札および手札
 * - tableCards: 場に出たカード
 * - playerCards: プレイヤーのカードの配列
 * - isCorrectOrder: 正解・不正解の状態
 * - setTableCards: 場に出たカードの更新関数
 * - setPlayerCards: プレイヤーのカードの更新関数
 * - setIsCorrectOrder：正解・不正解の更新関数
 */
export type BoardProps = {
  cards: CardProps[];
  tableCards: CardProps[];
  playerCards: CardProps[][];
  isCorrectOrder: boolean | null;
  setTableCards: (cards: CardProps[]) => void;
  setPlayerCards: (cards: CardProps[][]) => void;
  setIsCorrectOrder: (value: boolean | null) => void;
};
