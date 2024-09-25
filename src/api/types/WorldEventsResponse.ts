export type WorldEventsResponse = {
  count: number; // イベントの総数
  overflow: boolean; // オーバーフローの有無
  next: string | null; // 次のページのURL
  previous: string | null; // 前のページのURL
  results: Event[]; // イベントの配列
};

export type Event = {
  relevance: number; // 関連性スコア
  id: string; // イベントID
  title: string; // イベントタイトル
  alternate_titles?: string[]; // 代替タイトル
  description: string; // イベントの説明
  category: string; // カテゴリー
  labels: string[]; // ラベル
  rank: number; // ランク
  local_rank: number; // ローカルランク
  phq_attendance: number; // 予測参加者数
  entities: Entity[]; // 関連するエンティティ
  duration: number; // イベントの期間
  start: string; // 開始日時（ISO 8601形式）
  start_local: string; // 開始日時（ローカルタイム）
  end: string; // 終了日時（ISO 8601形式）
  end_local: string; // 終了日時（ローカルタイム）
  predicted_end: string; // 予測終了日時（ISO 8601形式）
  predicted_end_local: string; // 予測終了日時（ローカルタイム）
  updated: string; // 最終更新日時（ISO 8601形式）
  first_seen: string; // 最初に見られた日時（ISO 8601形式）
  timezone: string; // タイムゾーン
  location: number[]; // 地理座標（[longitude, latitude]）
  geo: Geo; // 地理情報
  impact_patterns: ImpactPattern[]; // 影響パターン
  scope: string; // スコープ
  country: string; // 国コード
  place_hierarchies: string[][]; // 場所の階層
  state: string; // イベントの状態
  brand_safe: boolean; // ブランド安全
  private: boolean; // プライベートかどうか
  predicted_event_spend: number; // 予測されるイベント支出
  predicted_event_spend_industries: { [key: string]: number }; // 産業別の予測支出
  phq_labels: PHQLabel[]; // PHQラベル
};

export type Entity = {
  entity_id: string; // エンティティID
  name: string; // エンティティ名
  type: string; // エンティティのタイプ
  formatted_address: string; // フォーマットされた住所
};

export type Geo = {
  geometry: Geometry; // ジオメトリ情報
  placekey: string; // プレースキー
  address: Address; // 住所情報
};

export type Geometry = {
  coordinates: number[]; // 座標（[longitude, latitude]）
  type: string; // ジオメトリタイプ
};

export type Address = {
  country_code: string; // 国コード
  formatted_address: string; // フォーマットされた住所
  postcode: string; // 郵便番号
  locality: string; // 地域名
  region: string; // 地域
};

export type ImpactPattern = {
  vertical: string; // 垂直分野
  impact_type: string; // 影響の種類
  impacts: Impact[]; // 影響の配列
};

export type Impact = {
  date_local: string; // ローカル日付
  value: number; // 影響の値
  position: string; // 影響の位置
};

export type PHQLabel = {
  label: string; // PHQラベル名
  weight: number; // 重み
};
