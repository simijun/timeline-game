'use client';

import { FaCheckCircle } from 'react-icons/fa';
import { CheckResultButtonProps } from '@/types/CheckResultButton';
import { buttonBaseStyle, buttonEnabledStyle } from '@/components/atoms/CheckResultButton/CheckResultButton.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 結果確認ボタン
 */
export const CheckResultButton = (props: CheckResultButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={!props.isEnabled}
      className={`${buttonBaseStyle} ${props.isEnabled ? buttonEnabledStyle.enabled : buttonEnabledStyle.disabled}`}
    >
      <FaCheckCircle />
      結果確認
    </button>
  );
};

export default CheckResultButton;
