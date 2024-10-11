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
    // 取得後のデッキが存在するか確認
    if (props.deck.length === 0) {
      console.error("デッキにカードが存在しません。");
      return;
    }

    // デッキをシャッフル
    const shuffledDeck = [...props.deck].sort(() => 0.5 - Math.random());

    // プレイヤーごとの手札を管理するための二次元配列を用意
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
        }
      }
    }

    // 山札から1枚を場に出す
    const tableCard = shuffledDeck.pop(); // デッキから場に出すカードを引く

    if (tableCard) {
      props.onDistribute(playerCards, tableCard); // プレイヤーの手札と場に出すカードを設定
      props.setDeck(shuffledDeck); // 残りのデッキを更新
      props.setCurrentTurn(0); // プレイヤー1から開始
      props.setIsCorrectOrder(null); // 正誤判定をリセット
      props.setRankings([]); // 順位をリセット
    } else {
      console.error("デッキに十分なカードがありません。");
    }
  };

  return <button onClick={distributeCards}>カードを配布</button>;
};

export default DistributeButton;
