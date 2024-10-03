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
    // 元のカードをシャッフル
    const shuffledCards = [...props.cards].sort(() => 0.5 - Math.random());

    // プレイヤーごとの手札を管理するための二次元配列を用意
    const playerCards: CardProps[][] = Array.from(
      { length: props.playerCount },
      () => []
    );

    // 各プレイヤーに4枚ずつカードを配布する
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < props.playerCount; j++) {
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

      // 残りの山札を更新
      props.setCards(shuffledCards);
    }
  };

  return <button onClick={distributeCards}>カードを配布</button>;
};

export default DistributeButton;
