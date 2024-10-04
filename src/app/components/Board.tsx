import { useRef, useState, useEffect } from "react";
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
  const [droppedPlayerIndex, setDroppedPlayerIndex] = useState<number | null>(
    null
  );
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [droppedCardId, setDroppedCardId] = useState<number | null>(null); // 追加

  // Board の状態をリセット
  useEffect(() => {
    if (props.isCorrectOrder === null) {
      setShowYears({});
    }
  }, [props.isCorrectOrder]);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      const cardToMove = item.isTableCard
        ? props.tableCards.find((card) => card.id === item.id)
        : props.playerCards.flat().find((card) => card.id === item.id);

      if (cardToMove) {
        // 出したカードのプレイヤーのインデックスを保存（手札からの場合のみ）
        if (!item.isTableCard) {
          setDroppedPlayerIndex(item.playerIndex);
        }

        // ドロップしたカードのIDを追跡
        setDroppedCardId(cardToMove.id);

        const updatedPlayerCards = item.isTableCard
          ? props.playerCards
          : props.playerCards.map((hand) =>
              hand.filter((card) => card.id !== item.id)
            );

        props.setPlayerCards(updatedPlayerCards);

        // ドロップ位置の特定
        const clientOffset = monitor.getClientOffset();
        const boardRect = dropRef.current?.getBoundingClientRect();

        if (clientOffset && boardRect) {
          const dropX = clientOffset.x - boardRect.left;
          let insertIndex = props.tableCards.length;

          for (let index = 0; index < props.tableCards.length; index++) {
            const cardElement = document.getElementById(
              `table-card-${props.tableCards[index].id}`
            );
            if (cardElement) {
              const cardRect = cardElement.getBoundingClientRect();
              if (dropX < cardRect.left - boardRect.left + cardRect.width / 2) {
                insertIndex = index;
                break;
              }
            }
          }

          const newTableCards = props.tableCards.filter(
            (card) => card.id !== item.id
          );
          newTableCards.splice(insertIndex, 0, cardToMove);
          props.setTableCards(newTableCards);
        }
      }
    },
  });

  drop(dropRef);

  const checkOrder = () => {
    const isSorted = props.tableCards.every(
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      props.setIsCorrectOrder(true);
    } else {
      props.setIsCorrectOrder(false);

      const sortedCards = [...props.tableCards].sort((a, b) => a.year - b.year);
      props.setTableCards(sortedCards);

      // ドロップしたカードのみ `year` を表示
      if (droppedCardId !== null) {
        setShowYears((prev) => ({ ...prev, [droppedCardId]: true }));
      }

      // 山札からカードを引く処理
      const newCard = props.cards.pop();

      if (newCard !== undefined && droppedPlayerIndex !== null) {
        const updatedPlayerCards = [...props.playerCards];
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
      {props.tableCards.length > 0 && (
        <div
          css={css`
            display: flex;
            overflow-x: auto;
            max-width: 80vw;
            padding: 10px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: flex-start;
              flex-direction: row;
              margin-bottom: 20px;
            `}
          >
            {props.tableCards.map((card, index) => (
              <div
                key={`table-card-${index}-${card.id}`}
                id={`table-card-${card.id}`}
              >
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
        </div>
      )}

      {props.isCorrectOrder !== null && (
        <div>
          {props.isCorrectOrder ? (
            <p>正解!</p>
          ) : (
            <p
              css={css`
                color: red;
                font-weight: bold;
              `}
            >
              不正解!1枚ドロー!
            </p>
          )}
        </div>
      )}

      <button onClick={checkOrder}>結果を確認</button>
    </div>
  );
};

export default Board;
