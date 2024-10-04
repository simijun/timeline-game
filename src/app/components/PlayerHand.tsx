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
                `}
              >
                {playerHand.map((card, cardIndex) => (
                  <div
                    // 3つの要素を組み合わせてユニークなkeyを生成
                    key={`player-${playerIndex}-card-${cardIndex}`}
                    css={css`
                      margin-bottom: 10px;
                    `}
                  >
                    <Card
                      index={cardIndex}
                      playerIndex={playerIndex}
                      card={card}
                      isTableCard={false}
                      showYear={false}
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
