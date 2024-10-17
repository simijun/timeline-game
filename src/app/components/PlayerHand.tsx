import { css } from "@emotion/react";
import { Card } from "@/app/components/Card";
import { PlayerHandProps } from "@/app/types/PlayerHand";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * プレイヤーの手札
 */
export const PlayerHand = (props: PlayerHandProps) => {
  return (
    <>
      {props.playerCards?.length > 0 && (
        <div
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 12px;
            width: 100%;
            max-width: 900px;
            min-height: 150px;
            margin-bottom: 2px;
            opacity: ${props.playerIndex === props.currentTurn ? 1 : 0.5};
            border: 2px solid #4169e1;
            padding: 10px;
            box-sizing: border-box;
          `}
        >
          {props.playerCards.map((card, cardIndex) => (
            <div
              key={`player-card-${cardIndex}-${card.id}`}
              css={css`
                margin-right: 5px;
              `}
            >
              <Card
                index={card.id}
                playerIndex={props.playerIndex}
                card={card}
                isTableCard={false}
                showYear={false}
                isDraggable={props.playerIndex === props.currentTurn}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlayerHand;
