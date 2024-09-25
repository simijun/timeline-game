import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import router from "next/router";

import { HttpMethod } from "@/app/types/enum/HttpMethod";
import { AppRoutes } from "@/common/AppRoutes";

/** APIクライアントインスタンス */
const client = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * APIリクエスト
 *
 * @param url リクエストURL
 * @param method リクエストメソッド
 * @param params リクエストボディパラメータ
 * @param config axiosリクエスト設定パラメータ（デフォルト：なし）
 * @returns 正常終了：レスポンスオブジェクト 異常終了：undefined
 */
export async function request<ResponseType>(
  url: string,
  method: HttpMethod,
  config: AxiosRequestConfig = {}
) {
  try {
    const response: AxiosResponse<ResponseType> = await client.request({
      ...config,
      url: url,
      method: method,
      timeout: 30000,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (error) {
    if (Axios.isCancel(error)) {
      return undefined;
    }
    if (Axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        switch (error.response?.status) {
          case 500:
            showErrorAlert(
              `通信エラー：${error.response.status} ${error.response.statusText}`
            );
            break;
          default:
            showErrorAlert(
              `予期せぬステータスの通信エラー：${error.response.status} ${error.response.statusText}`
            );
        }
      } else {
        showErrorAlert("ステータスコードのない通信エラー");
      }
    } else {
      showErrorAlert("予期せぬ通信エラー");
    }
    return undefined;
  }
}

/**
 * APIエラーアラートを表示
 *
 * @param message アラートメッセージ
 */
const showErrorAlert = (message: string) => {
  if (alert(message) === undefined) {
    router.push(AppRoutes.index);
  }
};

/**
 * GETリクエスト
 *
 * @param url リクエストURL
 * @param config axiosリクエスト設定パラメータ（デフォルト：なし）
 */
export async function get<ResponseType>(
  url: string,
  config?: AxiosRequestConfig
) {
  return request<ResponseType>(url, "get", config);
}
