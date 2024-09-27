import { useState } from "react";
import { CardProps } from "@/app/types/Card";
import { DistributeCardsProps } from "@/app/types/distributeBUtton";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カード配布ボタンコンポーネント
 */
export const DistributeButton = (props: DistributeCardsProps) => {
  const [playerCount, setPlayerCount] = useState(2);

  const distributeCards = () => {
    // 元のカードをシャッフル
    const shuffledCards = [...props.cards].sort(() => 0.5 - Math.random());

    // プレイヤーごとの手札を管理するための二次元配列を作成
    const playerCards: CardProps[][] = Array.from(
      { length: playerCount },
      () => []
    );

    // 各プレイヤーに4枚ずつカードを配布する
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < playerCount; j++) {
        const cardToDistribute = shuffledCards.pop();
        if (cardToDistribute) {
          playerCards[j].push(cardToDistribute);
        }
      }
    }

    // 山札から1枚を場に出す
    const tableCard = shuffledCards.pop();

    // 配布後の手札と場のカードを更新するためのコールバックを呼び出す
    if (tableCard) {
      props.onDistribute(playerCards, tableCard);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="playerCount">参加人数：</label>
        <select
          id="playerCount"
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <button onClick={distributeCards}>カードを配布</button>
    </>
  );
};
