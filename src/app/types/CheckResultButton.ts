/**
 * 結果確認ボタン情報の型
 * - isEnabled：ボタンが有効か無効かを示すフラグ
 * - onClick：ボタンがクリックされた時に呼び出されるコールバック関数
 */
export type CheckResultButtonProps = {
  isEnabled: boolean;
  onClick: () => void;
};
