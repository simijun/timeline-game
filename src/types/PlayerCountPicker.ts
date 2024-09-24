/**
 * 参加人数プルダウン情報の型
 * - playerCount: 参加人数
 * - setPlayerCount: 参加人数更新関数
 */
export type PlayerCountPickerProps = {
  playerCount: number;
  setPlayerCount: (count: number) => void;
};
