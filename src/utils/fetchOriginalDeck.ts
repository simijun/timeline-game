import { supabase } from '../../lib/supabase';
import { AppConst } from '@/common/AppConst';
import { CardProps } from '@/types/Card';

// Supabaseからのカード情報取得をサーバーサイドで実行
export const fetchOriginalDeck = async (): Promise<CardProps[]> => {
  const { data, error } = await supabase.from(AppConst.TIMELINE_CARDS).select('*');
  if (error) {
    console.error('デッキの取得エラー:', error);
    return [];
  }
  return data || [];
};
