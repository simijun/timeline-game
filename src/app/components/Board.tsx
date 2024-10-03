import { useRef, useState } from "react";
import { css } from "@emotion/react";
import { useDrop } from "react-dnd";
import { Card } from "@/app/components/Card";
import { BoardProps } from "@/app/types/Board";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 場に出たカード
 */
export const Board = (props: BoardProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);
  const [droppedPlayerIndex, setDroppedPlayerIndex] = useState<number | null>(
    null
  );
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});

  // ドロップ位置を制限せず、任意の場所にカードを置けるようにする
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      if (!item.isTableCard) {
        const cardToMove = props.playerCards
          .flat()
          .find((card) => card.id === item.id);

        if (cardToMove) {
          // 出したカードのプレイヤーのインデックスを保存
          setDroppedPlayerIndex(item.playerIndex);

          const updatedPlayerCards = props.playerCards.map((hand) =>
            hand.filter((card) => card.id !== item.id)
          );
          props.setPlayerCards(updatedPlayerCards);

          // ドロップ位置の特定
          const clientOffset = monitor.getClientOffset();
          const boardRect = dropRef.current?.getBoundingClientRect();

          if (clientOffset && boardRect) {
            const dropX = clientOffset.x - boardRect.left;
            let insertIndex = props.tableCards.length;

            // ドロップ位置に基づいて挿入位置を特定
            for (let index = 0; index < props.tableCards.length; index++) {
              const cardElement = document.getElementById(
                `table-card-${props.tableCards[index].id}`
              );
              if (cardElement) {
                const cardRect = cardElement.getBoundingClientRect();
                // ドロップ位置がこのカードの左側にある場合、その位置に挿入
                if (
                  dropX <
                  cardRect.left - boardRect.left + cardRect.width / 2
                ) {
                  insertIndex = index;
                  break; // 最初の条件に一致するインデックスでループを抜ける
                }
              }
            }

            // カードを場の指定位置に挿入
            const newTableCards = [
              ...props.tableCards.slice(0, insertIndex),
              cardToMove,
              ...props.tableCards.slice(insertIndex),
            ];
            props.setTableCards(newTableCards);
          }
        }
      }
    },
  });

  drop(dropRef);

  // 結果確認ボタンのロジック
  const checkOrder = () => {
    const isSorted = props.tableCards.every(
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      setIsCorrectOrder(true);
    } else {
      setIsCorrectOrder(false);

      const sortedCards = [...props.tableCards].sort((a, b) => a.year - b.year);
      props.setTableCards(sortedCards);

      // ドロップしたカードのみ `year` を表示
      const lastDroppedCardId =
        props.tableCards[props.tableCards.length - 1].id;
      setShowYears((prev) => ({ ...prev, [lastDroppedCardId]: true }));

      // 山札からカードを引く処理
      const newCard = props.cards.pop();

      // 正しいプレイヤーの手札に追加
      if (newCard !== undefined && droppedPlayerIndex !== null) {
        const updatedPlayerCards = [...props.playerCards];

        // 手札が存在するか確認してから追加
        if (updatedPlayerCards[droppedPlayerIndex]) {
          updatedPlayerCards[droppedPlayerIndex].push(newCard);
          props.setPlayerCards(updatedPlayerCards);
        }
      }
    }
  };

  return (
    <div
      ref={dropRef}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      `}
    >
      <h2>場に出たカード</h2>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          margin-bottom: 20px;
        `}
      >
        {props.tableCards.map((card, index) => (
          <div key={card.id} id={`table-card-${card.id}`}>
            <Card
              index={index}
              card={card}
              isTableCard={true}
              playerIndex={-1}
              showYear={!!showYears[card.id]}
            />
          </div>
        ))}
      </div>

      {isCorrectOrder !== null && (
        <div>
          {isCorrectOrder ? (
            <p>順番が正しいです！</p>
          ) : (
            <p>順番が間違っています！カードを引きます。</p>
          )}
        </div>
      )}

      <button onClick={checkOrder}>結果を確認</button>
    </div>
  );
};

export default Board;
