import { CardProps } from "@/app/types/Card";
import { DistributeCardsProps } from "@/app/types/DistributeButton";
import { getRandomCards } from "@/app/utils/functions";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カード配布ボタン
 */
export const DistributeButton = (props: DistributeCardsProps) => {
  const distributeCards = () => {
    // originalDeck が空でないか確認
    if (props.originalDeck.length === 0) {
      console.error("originalDeck が空です。");
      return;
    }

    // originalDeck からランダムに6枚選んでデッキを生成
    let shuffledDeck = getRandomCards(props.originalDeck, 50);
    console.log(
      "ゲームに使用するシャッフル後のデッキ枚数:",
      shuffledDeck.length
    );

    const requiredCards = props.playerCount * 2 + 1; // 必要なカード枚数
    if (shuffledDeck.length < requiredCards) {
      console.error("デッキに十分なカードがありません。");
      return;
    }

    const playerCards: CardProps[][] = Array.from(
      { length: props.playerCount },
      () => []
    );

    // 各プレイヤーに2枚ずつ配布
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < props.playerCount; j++) {
        const cardToDistribute = shuffledDeck.pop();
        console.log(
          `プレイヤー ${j + 1} に配布されたカード:`,
          cardToDistribute
        );
        if (cardToDistribute) {
          playerCards[j].push(cardToDistribute);
        } else {
          console.error("デッキに十分なカードがありません。");
          return;
        }
      }
    }

    // 場に出すカードを1枚引く
    const tableCard = shuffledDeck.pop();
    console.log("場に出すカード:", tableCard); // 場に出すカードを確認
    if (tableCard) {
      props.onDistribute(playerCards, tableCard);
      props.setDeck(shuffledDeck); // 残りのデッキをセット
      console.log("配布後のデッキ枚数:", shuffledDeck.length); // デッキが減ったか確認
    } else {
      console.error("デッキに十分なカードがありません。");
    }
  };

  return <button onClick={distributeCards}>カードを配布</button>;
};

export default DistributeButton;
