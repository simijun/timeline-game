import { css } from "@emotion/react";
import { Card } from "@/app/components/Card";
import { BoardProps } from "@/app/types/Board";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 場（Board）に出たカード
 */
export const Board = (props: BoardProps) => {
  const moveCardToTable = (
    dragIndex: number,
    hoverIndex: number,
    playerIndex: number
  ) => {
    const updatedTableCards = [...props.tableCards];
    const updatedPlayerCards = [...props.playerCards];
    const draggedCard = updatedPlayerCards[playerIndex][dragIndex];

    // ドロップ先にカードを移動する
    updatedTableCards.splice(hoverIndex, 0, draggedCard);
    // 手札から削除
    updatedPlayerCards[playerIndex].splice(dragIndex, 1);

    props.setTableCards(updatedTableCards);
    props.setPlayerCards(updatedPlayerCards);
  };

  return (
    <div>
      <h2>場に出たカード</h2>
      {props.tableCards.map((card, index) => (
        <Card
          key={index}
          index={index}
          card={card}
          moveCardToTable={moveCardToTable}
          isTableCard={true}
          playerIndex={-1} // テーブルカードの場合、適当な値を渡す
        />
      ))}

      {/* プレイヤーごとの手札を表示 */}
      {props.playerCards.length > 0 && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: row;
            width: 100%;
          `}
        >
          {props.playerCards.map((playerHand, playerIndex) => (
            <div key={playerIndex}>
              <h2>プレイヤー {playerIndex + 1}</h2>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                `}
              >
                {playerHand.map((card, cardIndex) => (
                  <div
                    key={card.id}
                    css={css`
                      margin-bottom: 10px;
                    `}
                  >
                    <Card
                      index={cardIndex}
                      playerIndex={playerIndex}
                      card={card}
                      moveCardToTable={moveCardToTable}
                      isTableCard={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
