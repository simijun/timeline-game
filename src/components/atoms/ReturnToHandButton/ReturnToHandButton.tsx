'use client';

import { FaUndo } from 'react-icons/fa';
import { ReturnToHandButtonProps } from '@/types/ReturnToHandButton';
import { buttonBaseStyle, buttonStateStyle } from '@/components/atoms/ReturnToHandButton/ReturnToHandButton.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 手札に戻すボタン
 */
export const ReturnToHandButton = (props: ReturnToHandButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={!props.isEnabled}
      className={`${buttonBaseStyle} ${props.isEnabled ? buttonStateStyle.enabled : buttonStateStyle.disabled}`}
    >
      <FaUndo />
      手札に戻す
    </button>
  );
};

export default ReturnToHandButton;
