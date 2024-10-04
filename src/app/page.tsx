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
import { PlayerCountPicker } from "@/app/components/PlayerCountPicker";

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
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);
  const [rankings, setRankings] = useState<number[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(0);

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
      {/* 順位表示 */}
      {rankings.length > 0 && (
        <div>
          <h2>ランキング</h2>
          <ul>
            {rankings.map((playerIndex, rank) => (
              <li key={playerIndex}>
                {rank + 1}位: プレイヤー {playerIndex + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
      <PlayerCountPicker
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
      />
      <DistributeButton
        cards={cards}
        setCards={setCards}
        playerCount={playerCount}
        onDistribute={onDistribute}
        setIsCorrectOrder={setIsCorrectOrder}
      />
      <DndProvider backend={HTML5Backend}>
        <Board
          cards={cards}
          tableCards={tableCards}
          playerCards={playerCards}
          playerCount={playerCount}
          isCorrectOrder={isCorrectOrder}
          rankings={rankings}
          currentTurn={currentTurn}
          setTableCards={setTableCards}
          setPlayerCards={setPlayerCards}
          setIsCorrectOrder={setIsCorrectOrder}
          setRankings={setRankings}
          setCurrentTurn={setCurrentTurn}
        />
        <div>
          <h3>プレイヤー{currentTurn + 1}のターン</h3>
        </div>
        <PlayerHand playerCards={playerCards} currentTurn={currentTurn} />
      </DndProvider>
    </div>
  );
};

export default Home;
