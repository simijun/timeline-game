/**
 * アプリ共通定数定義
 */
// ※クラス名とimport名を同一にするためlintオプションでnamespaceの使用を許可する
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppConst {
  // ----------------------------------------------------------------------------------------------------
  // アプリ設定
  // ----------------------------------------------------------------------------------------------------

  /** アプリケーション:バージョン */
  export const APP_VERSION = 'v1.0.0';

  /** Supabaseテーブル名 */
  export const TIMELINE_CARDS = 'timeline-cards';

  /** カードジャンル */
  export const GENRES = [
    { key: 'history', label: '歴史' },
    { key: 'japanese_music', label: '邦楽' },
  ] as const;

  // ----------------------------------------------------------------------------------------------------
  // ゲーム設定
  // ----------------------------------------------------------------------------------------------------

  /** ゲームデフォルト参加人数 */
  export const DEFAULT_PLAYER_COUNT = 2;

  /** ゲーム参加人数の選択肢 */
  export const PLAYER_OPTIONS = [
    { player: 1, color: '#FF6347' },
    { player: 2, color: '#1E90FF' },
    { player: 3, color: '#FFD700' },
    { player: 4, color: '#32CD32' },
  ];

  /** ゲームに使用するデッキ枚数 */
  export const DECK_COUNT = 50;

  /** ゲームスタート時1プレイヤーに配られるカード枚数 */
  export const INITIAL_CARDS_PER_PLAYER = 4;
}
