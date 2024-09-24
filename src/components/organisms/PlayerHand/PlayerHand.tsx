'use client';

import { AppConst } from '@/common/AppConst';
import { Card } from '@/components/atoms/Card/Card';
import { PlayerHandProps } from '@/types/PlayerHand';
import { playerHandContainerStyle, playerTurnStyle } from '@/components/organisms/PlayerHand/PlayerHand.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * プレイヤーの手札
 */
export const PlayerHand = (props: PlayerHandProps) => {
  const getPlayerColor = (index: number) => AppConst.PLAYER_OPTIONS[index].color;

  return (
    <>
      {props.playerCards?.length > 0 && (
        <div
          className={`${playerHandContainerStyle} ${
            props.playerIndex === props.currentTurn ? playerTurnStyle.active : playerTurnStyle.inactive
          }`}
          style={{ backgroundColor: getPlayerColor(props.playerIndex) }}
        >
          {props.playerCards.map((card, cardIndex) => (
            <div key={`player-card-${cardIndex}-${card.id}`}>
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
