import { css } from "@emotion/react";
import { FaCheckCircle } from "react-icons/fa";
import { CheckResultButtonProps } from "@/app/types/CheckResultButton";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 結果確認ボタン
 */
const CheckResultButton = (props: CheckResultButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={!props.isEnabled}
      css={css`
        background-color: ${props.isEnabled ? "#28a745" : "#ccc"};
        color: white;
        font-size: 10px;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: ${props.isEnabled ? "pointer" : "not-allowed"};
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: ${props.isEnabled ? "#218838" : "#ccc"};
          transform: ${props.isEnabled ? "translateY(-2px)" : "none"};
        }

        &:active {
          transform: translateY(1px);
        }
      `}
    >
      <FaCheckCircle />
      結果確認
    </button>
  );
};

export default CheckResultButton;
