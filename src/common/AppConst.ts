/**
 * アプリ共通定数定義
 */
// ※クラス名とimport名を同一にするためlintオプションでnamespaceの使用を許可する
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppConst {
  // ----------------------------------------------------------------------------------------------------
  // レスポンシブデザインのブレイクポイント
  // NOTE: https://hashimotosan.hatenablog.jp/entry/2020/12/06/182327
  // ----------------------------------------------------------------------------------------------------

  /** レスポンシブデザインのブレイクポイント：PC */
  export const BREAKPOINT_PC = 960;

  /** レスポンシブデザインのブレイクポイント：スマートフォン横画面 */
  export const BREAKPOINT_SP_LANDSCAPE = 520;

  /** レスポンシブデザインのブレイクポイント：スマートフォン */
  export const BREAKPOINT_SP = 1;

  // ----------------------------------------------------------------------------------------------------
  // アプリ設定
  // ----------------------------------------------------------------------------------------------------

  /** アプリケーション:バージョン */
  export const APP_VERSION = "v1.0.0";

  /** Supabaseテーブル名 */
  export const TIMELINE_CARDS = "timeline-cards";

  /** カードジャンル */
  export const GENRE_HISTORY = "history";
  export const GENRE_INVENTION = "invention";

  // ----------------------------------------------------------------------------------------------------
  // ゲーム設定
  // ----------------------------------------------------------------------------------------------------

  /** ゲームデフォルト参加人数 */
  export const DEFAULT_PLAYER_COUNT = 2;

  /** ゲーム参加人数の選択肢 */
  export const PLAYER_OPTIONS = [2, 3, 4];

  /** ゲームに使用するデッキ枚数 */
  export const DECK_COUNT = 50;

  /** ゲームスタート時1プレイヤーに配られるカード枚数 */
  export const INITIAL_CARDS_PER_PLAYER = 4;
}
