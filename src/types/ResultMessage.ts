import { CardProps } from "@/types/Card";

/**
 * 結果表示に使用される情報の型
 * - tableCards：場に出ているカードのリスト
 * - playerCards：プレイヤーの手札のリスト
 * - playerCount: 参加人数
 * - isGameOver：ゲームが終了しているかどうか
 * - isCorrectOrder：場に出されたカードが正しい順番かどうか（nullの場合は結果未確認）
 * - deckLength：残りのデッキ枚数
 * - rankings：ゲーム終了時のプレイヤーランキング（プレイヤーインデックスの配列）
 * - setShowYears: カードに年代を表示する更新関数
 * - showMessage: 結果文言の表示を管理するフラグ
 * - setIsShowMessage: 結果文言の表示更新関数
 */
export type ResultMessageProps = {
  tableCards: CardProps[];
  playerCards: CardProps[][];
  playerCount: number;
  isGameOver: boolean;
  isCorrectOrder: boolean | null;
  deckLength: number;
  rankings: number[];
  setShowYears: (
    value:
      | { [key: number]: boolean }
      | ((prev: { [key: number]: boolean }) => { [key: number]: boolean })
  ) => void;
  showMessage: boolean;
  setShowMessage: (isVisible: boolean) => void;
};
