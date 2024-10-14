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
        <h2>ゲーム終了: 山札が切れました</h2>
        <ul>
          {props.rankings.map((playerIndex, rank) => (
            <li key={`player-${playerIndex}`}>
              {rank + 1}位: プレイヤー {playerIndex + 1}
            </li>
          ))}
        </ul>{" "}
      </div>
    );
  }

  if (props.isCorrectOrder !== null) {
    return (
      <div>
        {props.isCorrectOrder ? (
          <p>正解!</p>
        ) : (
          <p
            css={css`
              color: red;
              font-weight: bold;
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
