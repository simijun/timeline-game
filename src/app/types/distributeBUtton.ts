import { CardProps } from "@/app/types/Card";

/**
 * 配布カード情報の型
 * - originalDeck: ページロード時にSupabaseから取得して抽出した山札
 * - deck: 1ゲーム内で使用する山札
 * - setDeck: 山札更新処理
 * - playerCount: 参加人数
 * - onDistribute：カード配布処理
 * - setCurrentTurn: プレイヤーターンの更新関数
 * - getRandomCards: ランダムなカードを抽出する関数
 */
export type DistributeCardsProps = {
  originalDeck: CardProps[];
  deck: CardProps[];
  setDeck: (deck: CardProps[]) => void;
  playerCount: number;
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
  setCurrentTurn: (turn: number) => void;
  getRandomCards: (cards: CardProps[], count: number) => CardProps[];
};
