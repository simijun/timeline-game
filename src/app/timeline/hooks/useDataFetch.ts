import { AxiosRequestConfig } from "axios";
import { DependencyList, useEffect, useState } from "react";

/**
 * データ取得処理の型
 *
 * @param config AxiosRequestConfig axiosリクエスト設定パラメータ
 */
export type FetchAction = ({
  config,
}: {
  config: AxiosRequestConfig;
}) => Promise<void>;

/**
 * データ取得処理制御用Hook
 *
 * @param func データ取得処理
 * @param deps 依存配列（デフォルト：パラメータなし）
 */
export const useDataFetch = (func: FetchAction, deps?: DependencyList) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let hasFinished = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        await func({ config: { signal: abortController.signal } });
      } catch (err: unknown) {
        // Error型の場合、メッセージを設定
        if (err instanceof Error) {
          setError(err.message);
        } else {
          // その他の型の場合のデフォルトメッセージ
          setError("データの取得に失敗しました。");
        }
      } finally {
        hasFinished = true;
        setLoading(false);
      }
    })();

    // アンマウント時にデータ取得未完であればリクエストをキャンセル
    return () => {
      if (!hasFinished) {
        abortController.abort();
      }
    };
  }, deps);

  return { loading, error };
};
