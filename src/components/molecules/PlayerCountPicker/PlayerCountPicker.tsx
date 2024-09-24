'use client';

import { FaUser } from 'react-icons/fa';
import { PlayerCountPickerProps } from '@/types/PlayerCountPicker';
import { AppConst } from '@/common/AppConst';
import {
  containerStyle,
  labelStyle,
  buttonGroupStyle,
  buttonStyle,
  buttonVariants,
  iconStyle,
  selectedIconStyle,
} from '@/components/molecules/PlayerCountPicker/PlayerCountPicker.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 参加人数選択
 */
export const PlayerCountPicker = (props: PlayerCountPickerProps) => {
  return (
    <div className={containerStyle}>
      <label className={labelStyle}>参加人数：</label>
      <div className={buttonGroupStyle}>
        {AppConst.PLAYER_OPTIONS.map((option) => (
          <button
            key={option.player}
            onClick={() => props.setPlayerCount(option.player)}
            className={`${buttonStyle} ${
              props.playerCount === option.player ? buttonVariants.selected : buttonVariants.unselected
            }`}
          >
            <FaUser
              className={`${iconStyle} ${props.playerCount === option.player ? selectedIconStyle : ''}`}
              style={{ color: option.color }}
            />
            {option.player}
          </button>
        ))}
      </div>
    </div>
  );
};
