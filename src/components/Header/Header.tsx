'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useGenre } from '@/context/Genre';
import { AppConst } from '@/common/AppConst';
import { AppRoutes } from '@/common/AppRoutes';
import {
  headerStyle,
  titleStyle,
  plainTitleStyle,
  buttonGroupStyle,
  dropdownContainerStyle,
  dropdownButtonStyle,
  dropdownMenuStyle,
  dropdownItemStyle,
  ruleButtonStyle,
} from '@/components/Header/Header.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 共通ヘッダー
 */
export const Header = () => {
  // アプリ共通データ
  const { genre, setGenre } = useGenre();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathName = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ジャンル変更
  const handleGenreChange = (newGenre: (typeof AppConst.GENRES)[number]['key']) => {
    setGenre(newGenre);
    setIsDropdownOpen(false);
  };

  // ドロップダウンリスト外をクリックでリストを閉じる
  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className={headerStyle}>
      {pathName !== AppRoutes.index ? (
        <Link href={AppRoutes.index} passHref>
          <h1 className={titleStyle}>Timeline Game</h1>
        </Link>
      ) : (
        <h1 className={plainTitleStyle}>Timeline Game</h1>
      )}

      <div className={buttonGroupStyle}>
        {pathName !== AppRoutes.rule && (
          <div ref={dropdownRef} className={dropdownContainerStyle}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              className={dropdownButtonStyle}
            >
              ジャンル：{AppConst.GENRES.find((g) => g.key === genre)?.label}
            </button>

            {isDropdownOpen && (
              <ul className={dropdownMenuStyle}>
                {AppConst.GENRES.map((option) => (
                  <li key={option.key} onClick={() => handleGenreChange(option.key)} className={dropdownItemStyle}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Link href={AppRoutes.rule} passHref>
          <button className={ruleButtonStyle}>ルール説明</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
