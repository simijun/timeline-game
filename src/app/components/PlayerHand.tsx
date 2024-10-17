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
      {props.playerCards.length > 0 && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: row;
            width: 100%;
            font-size: 10px;
          `}
        >
          {props.playerCards.map((playerHand, playerIndex) => (
            <div key={`player-${playerIndex}`}>
              <h3>プレイヤー {playerIndex + 1}</h3>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  opacity: ${playerIndex === props.currentTurn ? 1 : 0.5};
                `}
              >
                {playerHand.map((card, cardIndex) => (
                  <div
                    key={`player-${playerIndex}-card-${cardIndex}-${card.id}`}
                    css={css`
                      margin-bottom: 10px;
                    `}
                  >
                    <Card
                      index={card.id}
                      playerIndex={playerIndex}
                      card={card}
                      isTableCard={false}
                      showYear={false}
                      isDraggable={playerIndex === props.currentTurn}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlayerHand;
