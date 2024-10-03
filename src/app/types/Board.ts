import { CardProps } from "@/app/types/Card";

/**
 * ボード情報の型
 * - cards: 1ゲーム内で使用する山札
 * - tableCards: 場に出たカード
 * - playerCards: プレイヤーのカードの配列
 * - setTableCards: 場に出たカードの更新関数
 * - setPlayerCards: プレイヤーのカードの更新関数
 */
export type BoardProps = {
  cards: CardProps[];
  tableCards: CardProps[];
  playerCards: CardProps[][];
  setTableCards: (cards: CardProps[]) => void;
  setPlayerCards: (cards: CardProps[][]) => void;
};
