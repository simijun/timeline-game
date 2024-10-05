import { useState } from "react";
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
  const [hintMode, setHintMode] = useState(false); // ヒントモードの状態
  const [cardShowYear, setCardShowYear] = useState<{ [key: number]: boolean }>(
    {}
  ); // カードIDで管理

  // ヒントを使ってカードの年代を表示する関数
  const revealYear = (playerIndex: number, cardId: number) => {
    if (!props.hintUsed[playerIndex] && hintMode) {
      // ヒントを使う処理（ヒントの使用フラグを更新）
      const newHintUsed = [...props.hintUsed];
      newHintUsed[playerIndex] = true;
      props.setHintUsed(newHintUsed);

      // 対象のカードの年代を表示するようにする
      setCardShowYear((prev) => ({
        ...prev,
        // カードのIDで状態を管理
        [cardId]: true,
      }));

      // ヒントを使った後はヒントモードをオフにする
      setHintMode(false);
    }
  };

  return (
    <>
      {/* ヒントボタン */}
      <button
        onClick={() => {
          setHintMode(true);
        }}
        // すでにヒントを使ったプレイヤーはボタンを無効化
        disabled={props.hintUsed[props.currentTurn]}
      >
        ヒントを使う
      </button>

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
                  opacity: ${playerIndex === props.currentTurn ? 1 : 0.5};
                `}
              >
                {playerHand.map((card, cardIndex) => (
                  <div
                    key={`player-${playerIndex}-card-${cardIndex}-${card.id}`}
                    css={css`
                      margin-bottom: 10px;
                    `}
                    onClick={() => revealYear(playerIndex, card.id)}
                  >
                    <Card
                      index={card.id}
                      playerIndex={playerIndex}
                      card={card}
                      isTableCard={false}
                      // カードのIDでヒント表示を管理
                      showYear={!!cardShowYear[card.id]}
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
