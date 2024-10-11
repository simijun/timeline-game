import { CardProps } from "@/app/types/Card";

/**
 * 配布カード情報の型
 * - originalDeck: ページロード時にSupabaseから取得して抽出した山札
 * - deck: 1ゲーム内で使用する山札
 * - fetchCards: Supabaseからカード情報を取得する非同期関数
 * - playerCount: 参加人数
 * - setDeck: 山札更新処理
 * - onDistribute：カード配布処理
 * - setIsCorrectOrder：正解・不正解の更新関数
 * - setCurrentTurn: プレイヤーターンの更新関数
 * - setRankings: プレイヤー順位の更新関数
 */
export type DistributeCardsProps = {
  originalDeck: CardProps[];
  deck: CardProps[];
  fetchCards: () => Promise<void>;
  playerCount: number;
  setDeck: (deck: CardProps[]) => void;
  onDistribute: (playerCards: CardProps[][], tableCard: CardProps) => void;
  setIsCorrectOrder: (value: boolean | null) => void;
  setCurrentTurn: (turn: number) => void;
  setRankings: (rank: number[]) => void;
};
