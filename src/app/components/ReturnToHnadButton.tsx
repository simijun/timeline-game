import { css } from "@emotion/react";
import { FaUndo } from "react-icons/fa";
import { ReturnToHandButtonProps } from "@/app/types/ReturnToHandButton";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 手札に戻すボタン
 */
const ReturnToHandButton = (props: ReturnToHandButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={!props.isEnabled}
      css={css`
        background-color: ${props.isEnabled ? "#007bff" : "#ccc"};
        color: white;
        font-size: 16px;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: ${props.isEnabled ? "pointer" : "not-allowed"};
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: ${props.isEnabled ? "#0056b3" : "#ccc"};
          transform: ${props.isEnabled ? "translateY(-2px)" : "none"};
        }

        &:active {
          transform: translateY(1px);
        }
      `}
    >
      <FaUndo />
      手札に戻す
    </button>
  );
};

export default ReturnToHandButton;
