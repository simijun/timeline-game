import { useState } from "react";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 参加人数選択プルダウン
 */
export const PlayerCountPicker = () => {
  const [playerCount, setPlayerCount] = useState(2);

  return (
    <div>
      <label htmlFor="playerCount">参加人数：</label>
      <select
        id="playerCount"
        value={playerCount}
        onChange={(e) => setPlayerCount(Number(e.target.value))}
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
