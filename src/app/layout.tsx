"use client";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>Timeline Game</title>
        <meta
          name="description"
          content="A fun game to arrange events in chronological order"
        />
        <link rel="icon" href="/timeline-app-icon.png" sizes="32x32" />
      </head>
      <body
        className={inter.className}
        // style={{
        //   backgroundImage: "url('/board-image.png')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <header>
          {/* <img
            src="/a.png"
            alt="Timeline Game Title Logo"
            style={{ width: "600px", height: "auto" }}
          /> */}
        </header>
        {children}
      </body>
    </html>
  );
}
