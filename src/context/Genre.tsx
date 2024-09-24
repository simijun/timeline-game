'use client';

import { ReactNode, createContext, useContext, useState } from 'react';
import { AppConst } from '@/common/AppConst';
import { GenreContextType } from '@/types/context/GenreContext';

/**
 * カードジャンル切替用のコンテキスト
 */
const GenreContext = createContext<GenreContextType | undefined>(undefined);

// カスタムフック
export const useGenre = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useGenre must be used within a GenreProvider');
  }
  return context;
};

// コンテキストプロバイダー
export const GenreProvider = ({ children }: { children: ReactNode }) => {
  const [genre, setGenre] = useState<string>(AppConst.GENRES[0].key);

  return <GenreContext.Provider value={{ genre, setGenre }}>{children}</GenreContext.Provider>;
};
