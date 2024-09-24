/**
 * ジャンルコンテキスト情報の型
 * - genre: ジャンル
 * - setGenre: ジャンル更新用関数

 */
export type GenreContextType = {
  genre: string;
  setGenre: (genre: string) => void;
};
