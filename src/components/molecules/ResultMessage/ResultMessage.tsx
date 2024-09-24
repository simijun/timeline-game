'use client';

import { useEffect } from 'react';
import { AppConst } from '@/common/AppConst';
import { ResultMessageProps } from '@/types/ResultMessage';
import {
  resultMessageContainerStyle,
  resultMessageVisibilityStyle,
  closeButtonStyle,
  gameOverTitleStyle,
  rankingsListStyle,
  rankingItemStyle,
  rankingIconStyle,
  correctOrderMessageStyle,
  drawMessageStyle,
} from '@/components/molecules/ResultMessage/ResultMessage.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 結果表示文言
 */
export const ResultMessage = (props: ResultMessageProps) => {
  const closeMessage = () => {
    props.setShowMessage(false);
  };

  // ゲームセットになったらそのゲームで使用された全てのカードの年代を表示するように更新
  useEffect(() => {
    if (props.isGameOver && props.showMessage) {
      const allPlayedCardIds = [
        ...props.tableCards.map((card) => card.id),
        ...props.playerCards.flat().map((card) => card.id),
      ];

      const showAllYears = allPlayedCardIds.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as { [key: number]: boolean });

      props.setShowYears(showAllYears);
    }
  }, [props.isGameOver, props.showMessage, props.tableCards, props.playerCards, props.setShowYears]);

  return (
    <>
      {props.showMessage && (
        <div
          className={`${resultMessageContainerStyle} ${
            props.showMessage ? resultMessageVisibilityStyle.visible : resultMessageVisibilityStyle.hidden
          }`}
        >
          <button onClick={closeMessage} className={closeButtonStyle}>
            ✕
          </button>

          {props.isGameOver ? (
            <>
              <h2 className={gameOverTitleStyle}>ゲームセット！</h2>
              <ul className={rankingsListStyle}>
                {props.rankings.slice(0, props.playerCount).map((playerIndex, rank) => {
                  const playerColor = AppConst.PLAYER_OPTIONS[playerIndex].color;
                  return (
                    <li key={`player-${playerIndex}`} className={rankingItemStyle} style={{ color: playerColor }}>
                      <span className={rankingIconStyle}>{rank + 1}位:</span>
                      <span>
                        {rank === 0 && '🏆 '}
                        {rank === 1 && '🥈 '}
                        {rank === 2 && '🥉 '}
                        {rank === 3 && '🥲 '}
                        プレイヤー {playerIndex + 1}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              {props.isCorrectOrder !== null && (
                <p
                  className={
                    props.isCorrectOrder ? correctOrderMessageStyle.correct : correctOrderMessageStyle.incorrect
                  }
                >
                  {props.isCorrectOrder ? '正解!' : '不正解!'}

                  {!props.isCorrectOrder && props.deckLength > 0 && (
                    <span className={drawMessageStyle}>1枚ドロー!</span>
                  )}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ResultMessage;
