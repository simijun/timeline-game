import { css } from "@emotion/react";
import { ResultMessageProps } from "@/app/types/ResultMessage";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 結果表示文言
 */
export const ResultMessage = (props: ResultMessageProps) => {
  if (props.isGameOver) {
    return (
      <div
        css={css`
          color: red;
          font-weight: bold;
        `}
      >
        <h2>ゲームセット！</h2>
        <ul>
          {props.rankings.map((playerIndex, rank) => (
            <li key={`player-${playerIndex}`}>
              {rank + 1}位: プレイヤー {playerIndex + 1}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (props.isCorrectOrder !== null) {
    return (
      <div>
        {props.isCorrectOrder ? (
          <p
            css={css`
              font-size: 16px;
            `}
          >
            正解!
          </p>
        ) : (
          <p
            css={css`
              color: #ff4500;
              font-weight: bold;
              font-size: 16px;
            `}
          >
            不正解!
            {props.deckLength > 0 && <br />}
            {props.deckLength > 0 && "1枚ドロー!"}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default ResultMessage;
