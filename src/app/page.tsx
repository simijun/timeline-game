"use client";

import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DistributeButton } from "@/app/components/DistributeButton";
import { Board } from "@/app/components/Board";
import { PlayerHand } from "@/app/components/PlayerHand";
import { CardProps } from "@/app/types/Card";
import { PlayerCountPicker } from "./components/PlayerCountPicker";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * タイムラインゲーム画面
 */
const Home = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [playerCards, setPlayerCards] = useState<CardProps[][]>([]);
  const [tableCards, setTableCards] = useState<CardProps[]>([]);

  // Supabaseからカード情報を取得
  const fetchCards = async () => {
    const { data, error } = await supabase.from("timeline-cards").select("*");
    if (error) {
      console.error("カード情報の取得に失敗しました:", error);
    } else if (data && data.length > 0) {
      const randomCards = getRandomCards(data, 50);
      setCards(randomCards);
    } else {
      console.log("カード情報が存在しません。");
      setCards([]);
    }
  };

  // supabaseの全レコードからランダムに50個抽出
  const getRandomCards = (cards: CardProps[], count: number) => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // プレイヤーと場（Board）へのカード配布処理
  const onDistribute = (playerCards: CardProps[][], tableCard: CardProps) => {
    setPlayerCards(playerCards);
    setTableCards([tableCard]);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      `}
    >
      <PlayerCountPicker />
      <DistributeButton cards={cards} onDistribute={onDistribute} />
      <DndProvider backend={HTML5Backend}>
        <Board
          tableCards={tableCards}
          playerCards={playerCards}
          setTableCards={setTableCards}
          setPlayerCards={setPlayerCards}
        />
        <PlayerHand playerCards={playerCards} />
      </DndProvider>
    </div>
  );
};

export default Home;
