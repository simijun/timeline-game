'use client';

import { PlayerHand } from '@/components/organisms/PlayerHand/PlayerHand';
import { PlayerHandLayoutProps } from '@/types/PlayerHandLayout';
import {
  playerHandContainerStyle,
  playerHandVariants,
} from '@/components/organisms/PlayerHandLayout/PlayerHandLayout.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * プレイヤーの手札を参加人数に応じて表示するためのレイアウト
 */
export const PlayerHandLayout = (props: PlayerHandLayoutProps) => {
  const renderPlayerHands = () => {
    switch (props.playerCount) {
      case 1:
        return (
          <div className={`${playerHandContainerStyle} ${playerHandVariants.top}`}>
            <PlayerHand playerCards={props.playerCards[0]} currentTurn={props.currentTurn} playerIndex={0} />
          </div>
        );

      case 2:
        return (
          <>
            <div className={`${playerHandContainerStyle} ${playerHandVariants.top}`}>
              <PlayerHand playerCards={props.playerCards[0]} currentTurn={props.currentTurn} playerIndex={0} />
            </div>
            <div className={`${playerHandContainerStyle} ${playerHandVariants.bottom}`}>
              <PlayerHand playerCards={props.playerCards[1]} currentTurn={props.currentTurn} playerIndex={1} />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className={`${playerHandContainerStyle} ${playerHandVariants.top} ${playerHandVariants.spaceAround}`}>
              <PlayerHand playerCards={props.playerCards[0]} currentTurn={props.currentTurn} playerIndex={0} />
              <PlayerHand playerCards={props.playerCards[1]} currentTurn={props.currentTurn} playerIndex={1} />
            </div>
            <div className={`${playerHandContainerStyle} ${playerHandVariants.bottom}`}>
              <PlayerHand playerCards={props.playerCards[2]} currentTurn={props.currentTurn} playerIndex={2} />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className={`${playerHandContainerStyle} ${playerHandVariants.top} ${playerHandVariants.spaceAround}`}>
              <PlayerHand playerCards={props.playerCards[0]} currentTurn={props.currentTurn} playerIndex={0} />
              <PlayerHand playerCards={props.playerCards[1]} currentTurn={props.currentTurn} playerIndex={1} />
            </div>
            <div
              className={`${playerHandContainerStyle} ${playerHandVariants.bottom} ${playerHandVariants.spaceAround}`}
            >
              <PlayerHand playerCards={props.playerCards[2]} currentTurn={props.currentTurn} playerIndex={2} />
              <PlayerHand playerCards={props.playerCards[3]} currentTurn={props.currentTurn} playerIndex={3} />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <>{renderPlayerHands()}</>;
};

export default PlayerHandLayout;
