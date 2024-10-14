import { CardProps } from "@/app/types/Card";

/**
 * Board情報の型
 * - tableCards: 場に出たカード
 * - playerCount: 参加人数
 * - playerCards: プレイヤーのカードの配列
 * - currentTurn: 現在のプレイヤーのターン
 * - isCorrectOrder: 正解・不正解の状態
 * - lockedCardIds: 移動不可のカードのIDリスト
 * - showYears: 年代を表示するカードのIDリスト
 * - setTableCards: 場に出たカードの更新関数
 * - setPlayerCards: プレイヤーのカードの更新関数
 * - setLastDroppedCardId: 最後にドロップされたカードのIDをセット
 * - setLastDroppedCard: 最後にドロップされたカードの情報をセット
 * - setCanCheckResult: 結果確認ボタンをアクティブにする関数
 * - setCanReturnCard: 手札に戻すボタンをアクティブにする関数
 */
export type BoardProps = {
  tableCards: CardProps[]; // 場に出たカードの配列
  playerCount: number; // 参加人数
  playerCards: CardProps[][]; // 各プレイヤーのカード配列
  currentTurn: number; // 現在のプレイヤーのターン
  isCorrectOrder: boolean | null; // 正解・不正解の状態
  lockedCardIds: number[]; // 移動できないカードのIDリスト
  showYears: { [key: number]: boolean }; // 年代を表示するカードのIDリスト
  setTableCards: (cards: CardProps[]) => void; // 場に出たカードの更新関数
  setPlayerCards: (cards: CardProps[][]) => void; // プレイヤーのカードの更新関数
  setLastDroppedCardId: (id: number) => void; // 最後にドロップされたカードのIDをセットする関数
  setLastDroppedCard: (
    data: {
      card: CardProps;
      playerIndex: number;
      originalIndex: number;
    } | null
  ) => void; // 最後にドロップされたカードの情報をセットする関数
  setCanCheckResult: (active: boolean) => void; // 結果確認ボタンをアクティブにする関数
  setCanReturnCard: (active: boolean) => void; // 手札に戻すボタンをアクティブにする関数
};
