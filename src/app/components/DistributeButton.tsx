import { css } from "@emotion/react";
import { FaHandPaper } from "react-icons/fa";
import { AppConst } from "@/common/AppConst";
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
    // originalDeck が空でないか確認
    if (props.originalDeck.length === 0) {
      console.error("originalDeck が空です。");
      return;
    }

    // originalDeck からランダムに指定枚数選んでデッキを生成
    let shuffledDeck = props.getRandomCards(
      props.originalDeck,
      AppConst.DECK_COUNT
    );
    console.log(
      "ゲームに使用するシャッフル後のデッキ枚数:",
      shuffledDeck.length
    );

    // 必要なカード枚数
    const requiredCards =
      props.playerCount * AppConst.INITIAL_CARDS_PER_PLAYER + 1;
    if (shuffledDeck.length < requiredCards) {
      console.error("デッキに十分なカードがありません。");
      return;
    }

    const playerCards: CardProps[][] = Array.from(
      { length: props.playerCount },
      () => []
    );

    // 各プレイヤーにカード配布
    for (let i = 0; i < AppConst.INITIAL_CARDS_PER_PLAYER; i++) {
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
    console.log("場に出すカード:", tableCard);
    if (tableCard) {
      props.onDistribute(playerCards, tableCard);
      props.setDeck(shuffledDeck);
      props.setCurrentTurn(0);
      console.log("配布後のデッキ枚数:", shuffledDeck.length);
    } else {
      console.error("デッキに十分なカードがありません。");
    }
  };

  return (
    <button
      onClick={distributeCards}
      css={css`
        background-color: #28a745;
        color: white;
        padding: 12px 25px;
        font-size: 12px;
        font-weight: bold;
        border: none;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          background-color: #218838; /* ホバー時の濃い緑 */
          transform: translateY(-3px); /* 少し浮き上がる */
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* 影が強くなる */
        }

        &:active {
          transform: translateY(1px); /* 押し込みアニメーション */
        }
      `}
    >
      <FaHandPaper size={24} /> カードを配布
    </button>
  );
};

export default DistributeButton;
