/**
 * 結果表示に使用される情報の型
 * - isGameOver：ゲームが終了しているかどうか
 * - isCorrectOrder：場に出されたカードが正しい順番かどうか（nullの場合は結果未確認）
 * - deckLength：残りのデッキ枚数
 * - rankings：ゲーム終了時のプレイヤーランキング（プレイヤーインデックスの配列）
 */
export type ResultMessageProps = {
  isGameOver: boolean;
  isCorrectOrder: boolean | null;
  deckLength: number;
  rankings: number[];
};
