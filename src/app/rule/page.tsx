'use client';

import Link from 'next/link';
import {
  containerStyle,
  headerStyle,
  titleStyle,
  sectionStyle,
  sectionTitleStyle,
  paragraphStyle,
  buttonContainerStyle,
  buttonStyle,
} from '@/app/rule/rule.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * ルール説明画面
 */
export default function Rule() {
  return (
    <div className={containerStyle}>
      <header className={headerStyle}>
        <h1 className={titleStyle}>ゲームルール</h1>
      </header>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>基本ルール</h2>
        <p className={paragraphStyle}>
          プレイヤーは各自、選択されたジャンルにまつわる事象のカードを手札として持ちます。
          <br />
          ゲームの目的は、それぞれのカードを正しい年代順に並べることです。（邦楽のリリース順etc...）
          <br />
          ゲームはラウンド形式で行われ、プレイヤーは自分のターンでカードを1枚ボードに置きます。
          <br />
          ボードには既に置かれているカードの間や前後にカードを配置することができます。
          <br />
          もし間違った順序でカードを置いてしまった場合、そのプレイヤーは新しいカードを1枚引き、
          <br />
          次のプレイヤーへターンが移った上で、そのカードの年代が表示されボード上でのヒントとなります。
        </p>
      </section>

      <section className={sectionStyle}>
        <h2 className={sectionTitleStyle}>勝利条件</h2>
        <p className={paragraphStyle}>最も早く手札を0枚にしたプレイヤーが勝者です！</p>
      </section>

      <div className={buttonContainerStyle}>
        <Link href="/">
          <button className={buttonStyle}>ゲームに戻る</button>
        </Link>
      </div>
    </div>
  );
}
