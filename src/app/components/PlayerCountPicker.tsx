import { PlayerCountPickerProps } from "@/app/types/PlayerCountPicker";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 参加人数選択プルダウン
 */
export const PlayerCountPicker = (props: PlayerCountPickerProps) => {
  return (
    <div>
      <label htmlFor="playerCount">参加人数：</label>
      <select
        id="playerCount"
        value={props.playerCount}
        onChange={(e) => props.setPlayerCount(Number(e.target.value))}
      >
        {[2, 3, 4, 5, 6].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};
