import { CardProps } from '@/types/Card';

/**
 * Board情報の型
 * - tableCards: 場に出たカード
 * - setTableCards: 場に出たカードの更新関数
 * - playerCards: プレイヤーのカードの配列
 * - setPlayerCards: プレイヤーのカードの更新関数
 * - showYears: 年代を表示するカードのIDリスト
 * - lockedCardIds: 移動不可のカードのIDリスト
 * - setLastDroppedCardId: 最後にドロップされたカードのIDをセット
 * - setLastDroppedCard: 最後にドロップされたカードの情報をセット
 * - setCanCheckResult: 結果確認ボタンをアクティブにする関数
 * - setCanReturnCard: 手札に戻すボタンをアクティブにする関数
 */
export type BoardProps = {
  tableCards: CardProps[];
  setTableCards: (cards: CardProps[]) => void;
  playerCards: CardProps[][];
  setPlayerCards: (cards: CardProps[][]) => void;
  showYears: { [key: number]: boolean };
  lockedCardIds: number[];
  setLastDroppedCardId: (id: number) => void;
  setLastDroppedCard: (
    data: {
      card: CardProps;
      playerIndex: number;
      originalIndex: number;
    } | null
  ) => void;
  setCanCheckResult: (active: boolean) => void;
  setCanReturnCard: (active: boolean) => void;
};
