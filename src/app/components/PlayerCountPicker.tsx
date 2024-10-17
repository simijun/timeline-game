import { css } from "@emotion/react";
import { FaUser } from "react-icons/fa";
import { PlayerCountPickerProps } from "@/app/types/PlayerCountPicker";
import { AppConst } from "@/common/AppConst";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 参加人数選択
 */
export const PlayerCountPicker = (props: PlayerCountPickerProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      `}
    >
      <label
        css={css`
          font-size: 12px;
          font-weight: bold;
          color: #333;
          margin-right: 15px; /* ラベルとボタンの間隔 */
        `}
      >
        参加人数：
      </label>
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        {AppConst.PLAYER_OPTIONS.map((num) => (
          <button
            key={num}
            onClick={() => props.setPlayerCount(num)}
            css={css`
              background-color: ${props.playerCount === num
                ? "#007bff"
                : "#f5f5f5"};
              color: ${props.playerCount === num ? "#fff" : "#333"};
              border: 2px solid
                ${props.playerCount === num ? "#0056b3" : "#ccc"};
              border-radius: 8px;
              padding: 10px 20px;
              font-size: 12px;
              font-weight: bold;
              display: flex;
              align-items: center;
              gap: 5px;
              cursor: pointer;
              transition: background-color 0.3s, border-color 0.3s;

              &:hover {
                background-color: ${props.playerCount === num
                  ? "#0056b3"
                  : "#e0e0e0"};
                border-color: ${props.playerCount === num ? "#004080" : "#bbb"};
              }
            `}
          >
            <FaUser /> {num}
          </button>
        ))}
      </div>
    </div>
  );
};
