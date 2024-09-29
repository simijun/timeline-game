import { useRef } from "react";
import { css } from "@emotion/react";
import { useDrop } from "react-dnd";
import { Card } from "@/app/components/Card";
import { BoardProps } from "@/app/types/Board";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 場（Board）に出たカード
 */
export const Board = (props: BoardProps) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: number; isTableCard: boolean }) => {
      // 場にカードを出すのは、手札からのカードだけ
      if (!item.isTableCard) {
        const cardToMove = props.playerCards
          .flat()
          .find((card) => card.id === item.id);
        if (cardToMove) {
          // プレイヤーの手札からカードを削除
          const updatedPlayerCards = props.playerCards.map((hand) =>
            hand.filter((card) => card.id !== item.id)
          );
          props.setPlayerCards(updatedPlayerCards);

          // カードを場に追加
          const newTableCards = [...props.tableCards, cardToMove];
          props.setTableCards(newTableCards);
        }
      }
    },
  });

  // drop関数を呼び出してrefを接続
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      // 後々横スクロール可能にする
      css={css``}
    >
      <h2>場に出たカード</h2>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          margin-bottom: 20px; /* 場と手札の間のスペース */
        `}
      >
        {props.tableCards.map((card, index) => (
          <Card
            key={card.id}
            index={index}
            card={card}
            isTableCard={true}
            playerIndex={-1}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
