import { CardProps } from "@/app/types/Card";
import { DistributeCardsProps } from "@/app/types/DistributeButton";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カード配布ボタン
 */
export const DistributeButton = (props: DistributeCardsProps) => {
  const distributeCards = () => {
    // プレイヤーに配布するために必要な枚数を計算
    const requiredCards = props.playerCount * 2 + 1; // 1人2枚＋場に1枚

    // デッキが足りるかチェック
    if (props.originalDeck.length < requiredCards) {
      console.error("デッキの枚数が足りません。");
      return;
    }

    // originalDeckから新しいコピー配列を作成
    const shuffledDeck = [...props.originalDeck].sort(
      () => 0.5 - Math.random()
    );

    const playerCards: CardProps[][] = Array.from(
      { length: props.playerCount },
      () => []
    );

    // 各プレイヤーにカードを配布
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < props.playerCount; j++) {
        const cardToDistribute = shuffledDeck.pop(); // デッキからカードを配布
        if (cardToDistribute) {
          playerCards[j].push(cardToDistribute);
        } else {
          console.error("デッキに十分なカードがありません。");
          return;
        }
      }
    }

    // 場に出すカード
    const tableCard = shuffledDeck.pop();
    if (tableCard) {
      props.onDistribute(playerCards, tableCard);
      props.setDeck(shuffledDeck); // ゲーム用のデッキをセット
      props.setCurrentTurn(0);
      props.setIsCorrectOrder(null);
      props.setRankings([]);
    } else {
      console.error("デッキに十分なカードがありません。");
    }
  };

  return <button onClick={distributeCards}>カードを配布</button>;
};

export default DistributeButton;
