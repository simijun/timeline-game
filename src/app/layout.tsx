import '@/app/globals.css';
import { Header } from '@/components/Header/Header';
import { GenreProvider } from '@/context/Genre';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Timeline Game',
  description: 'タイムラインボードゲーム',
  icons: {
    icon: '/images/timeline-app-icon.png',
  },
};

const inter = Inter({ subsets: ['latin'] });

/**
 * App Router のルートレイアウト
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <GenreProvider>
          <Header />
          {children}
        </GenreProvider>
      </body>
    </html>
  );
}
