import { CardProps } from "@/types/Card";

/**
 * 配布カード情報の型
 * - originalDeck: ページロード時にSupabaseから取得して抽出した山札
 * - deck: 1ゲーム内で使用する山札
 * - setDeck: 山札更新処理
 * - tableCards：場に出ているカードのリスト
 * - playerCards：プレイヤーの手札のリスト
 * - playerCount: 参加人数
 * - onDistribute：カード配布処理
 * - setShowYears: カードに年代を表示する更新関数
 * - setCurrentTurn: プレイヤーターンの更新関数
 * - getRandomCards: ランダムなカードを抽出する関数
 * - setIsShowMessage: 結果文言の表示更新関数
 */
export type DistributeButtonProps = {
  originalDeck: CardProps[];
  deck: CardProps[];
  setDeck: (deck: CardProps[]) => void;
  tableCards: CardProps[];
  playerCards: CardProps[][];
  playerCount: number;
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
  setShowYears: (
    value:
      | { [key: number]: boolean }
      | ((prev: { [key: number]: boolean }) => { [key: number]: boolean })
  ) => void;
  setCurrentTurn: (turn: number) => void;
  getRandomCards: (cards: CardProps[], count: number) => CardProps[];
  setShowMessage: (isVisible: boolean) => void;
};
