/**
 * カード情報の型
 * - id：カード識別番号
 * - event：出来事の説明
 * - year：出来事の年代
 * - image：出来事の画像
 * - genre: カードのジャンル
 */
export type CardProps = {
  id: number;
  event: string;
  year: number;
  image: string;
  genre: string;
};
