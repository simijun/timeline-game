import { useRef } from "react";
import { css } from "@emotion/react";
import { useDrop } from "react-dnd";
import { Card } from "@/app/components/Card";
import { BoardProps } from "@/app/types/Board";

/**
 * 場に出たカード
 */
export const Board = (props: BoardProps) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      // 最初に場に出た1枚のカードは移動できない
      if (props.tableCards.length === 1 && item.isTableCard) {
        console.log("最初に出たカードは移動できません");
        return;
      }

      // 移動不可のカード（ロックされたカード）は移動できない
      if (props.lockedCardIds.includes(item.id)) {
        console.log("このカードは結果確認後、移動できません");
        return;
      }

      const cardToMove = item.isTableCard
        ? props.tableCards.find((card) => card.id === item.id)
        : props.playerCards[item.playerIndex]?.find(
            (card) => card.id === item.id
          );

      if (cardToMove) {
        props.setLastDroppedCardId(cardToMove.id);

        if (item.isTableCard) {
          props.setLastDroppedCard({
            card: cardToMove,
            playerIndex: -1, // 場のカードなので playerIndex は -1
            originalIndex: props.tableCards.findIndex(
              (card) => card.id === item.id
            ),
          });
        } else {
          const originalIndex = props.playerCards[item.playerIndex]?.findIndex(
            (card) => card.id === item.id
          );

          if (originalIndex === undefined || originalIndex < 0) {
            console.error("Original index not found for card:", cardToMove);
            return;
          }

          props.setLastDroppedCard({
            card: cardToMove,
            playerIndex: item.playerIndex,
            originalIndex: originalIndex,
          });

          // プレイヤーの手札からカードを削除
          const updatedPlayerCards = props.playerCards.map((hand, index) =>
            index === item.playerIndex
              ? hand.filter((card) => card.id !== item.id)
              : hand
          );
          props.setPlayerCards(updatedPlayerCards);
        }

        // カードの位置調整
        const clientOffset = monitor.getClientOffset();
        const boardRect = dropRef.current?.getBoundingClientRect();

        if (clientOffset && boardRect) {
          const dropX = clientOffset.x - boardRect.left;
          let insertIndex = props.tableCards.length;

          // 各カードの中央位置を計算し、ドロップ位置がその中央より左か右かを判定
          for (let index = 0; index < props.tableCards.length; index++) {
            const cardElement = document.getElementById(
              `table-card-${props.tableCards[index].id}`
            );
            if (cardElement) {
              const cardRect = cardElement.getBoundingClientRect();
              // ドロップされた位置がカードの中央より左側か右側かを確認
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

          props.setCanCheckResult(true);
          props.setCanReturnCard(true);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 170px;
        background-image: url("/board-image.png");
        background-size: cover; /* 画像をボードに合わせて拡大・縮小 */
        background-position: center;
        border-radius: 125px / 125px;
        padding: 20px;
        box-shadow: ${isOver
          ? "0 0 20px rgba(0, 255, 255, 0.6)"
          : "0 0 15px rgba(0, 0, 0, 0.5)"};
        border: ${isOver ? "10px solid #00bfff" : "8px solid white"};
        transition: all 0.3s ease;
        overflow: hidden;
        position: relative;
      `}
    >
      {/* カードが追加されてもスクロールできる領域を確保するためのラッパー */}
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: ${props.tableCards.length > 1
            ? "flex-start"
            : "center"}; /* カードが1枚の時は中央に配置 */
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          padding-left: 70px;
          padding-right: 70px;
          position: relative;
        `}
      >
        {props.tableCards.map((card, index) => (
          <div
            key={`table-card-${index}-${card.id}`}
            id={`table-card-${card.id}`}
            css={css`
              margin: 0 3px;
            `}
          >
            <Card
              index={index}
              card={card}
              isTableCard={true}
              playerIndex={-1}
              showYear={!!props.showYears[card.id]}
              isDraggable={!props.lockedCardIds.includes(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
