import { CardProps } from "@/app/types/Card";

/**
 * ボード情報の型
 * - tableCards: 場に出たカード
 * - playerCards: プレイヤーのカードの配列
 * - setTableCards: 場に出たカードの更新関数
 * - setPlayerCards: プレイヤーのカードの更新関数
 */
export type BoardProps = {
  tableCards: CardProps[];
  playerCards: CardProps[][];
  setTableCards: (cards: CardProps[]) => void;
  setPlayerCards: (cards: CardProps[][]) => void;
};
