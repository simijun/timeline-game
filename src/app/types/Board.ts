import { CardProps } from "@/app/types/Card";

/**
 * Board情報の型
 * - cards: 1ゲーム内で使用する山札および手札
 * - tableCards: 場に出たカード
 * - playerCount: 参加人数
 * - playerCards: プレイヤーのカードの配列
 * - isCorrectOrder: 正解・不正解の状態
 * - rankings: プレイヤーの順位
 * - currentTurn: 現在のプレイヤーのターン
 * - setTableCards: 場に出たカードの更新関数
 * - setPlayerCards: プレイヤーのカードの更新関数
 * - setIsCorrectOrder：正解・不正解の更新関数
 * - setRankings: プレイヤー順位の更新関数
 * - setCurrentTurn: プレイヤーターンの更新関数
 */
export type BoardProps = {
  cards: CardProps[];
  tableCards: CardProps[];
  playerCount: number;
  playerCards: CardProps[][];
  isCorrectOrder: boolean | null;
  rankings: number[];
  currentTurn: number;
  setTableCards: (cards: CardProps[]) => void;
  setPlayerCards: (cards: CardProps[][]) => void;
  setIsCorrectOrder: (value: boolean | null) => void;
  setRankings: (update: (prev: number[]) => number[]) => void;
  setCurrentTurn: (turn: number | ((prevTurn: number) => number)) => void;
};
