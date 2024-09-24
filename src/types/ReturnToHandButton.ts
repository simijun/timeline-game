/**
 * 手札に戻すボタン情報の型
 * - isEnabled：ボタンが有効か無効かを示すフラグ
 * - onClick：ボタンがクリックされた時に呼び出されるコールバック関数
 */
export type ReturnToHandButtonProps = {
  isEnabled: boolean;
  onClick: () => void;
};
