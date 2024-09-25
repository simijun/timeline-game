import { useState, useEffect } from "react";
import { CardProps } from "@/app/types/Card";
import { ApiEndpoints } from "@/api/ApiParams";
import { get } from "@/api/ApiBase";
import { WorldEventsResponse } from "@/api/types/WorldEventsResponse";

/**
 * World Events APIからランダムなイベント情報を取得するフック
 */
const useFetchCards = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const url = `${ApiEndpoints.worldEvents}?limit=10`; // 10件取得するエンドポイント
        const res = await get<WorldEventsResponse>(url);

        // 正常終了時
        if (res) {
          // WorldEventsResponse から CardProps[] への変換
          const cardsData: CardProps[] = res.results.map((event) => ({
            id: event.id, // IDをそのまま使用
            event: event.title || "No Event", // イベント名
            year: new Date(event.start).getFullYear(), // 年を取得
            image: getEventImageUrl(event), // イメージを取得
          }));

          setCards(cardsData);
        }
      } catch (err) {
        setError("イベント情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []); // コンポーネントマウント時に一度だけ実行

  // イベントから画像URLを取得する関数
  const getEventImageUrl = (event: any): string => {
    // ここでイベントに基づく画像URLを取得するロジックを実装
    // 現在はデフォルト画像を返すようになっています
    return "/default-event-image.jpg"; // デフォルト画像を指定
  };

  return { cards, loading, error }; // カード情報、ローディング状態、エラーを返す
};

export default useFetchCards;
