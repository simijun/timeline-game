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
  const [originalDeck, setOriginalDeck] = useState<CardProps[]>([]);
  const [deck, setDeck] = useState<CardProps[]>([]);
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
      setOriginalDeck(data); // ここで元のデッキを保持
      const randomCards = getRandomCards(data, 6);
      setDeck(randomCards); // ここでは最初のゲーム用のデッキをセット
    } else {
      console.log("カード情報が存在しません。");
      setDeck([]);
    }
  };

  const getRandomCards = (cards: CardProps[], count: number) => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // プレイヤーと場へのカード配布処理
  const onDistribute = (playerCards: CardProps[][], tableCard: CardProps) => {
    setPlayerCards(playerCards);
    setTableCards([tableCard]);
  };

  // 山札からカードを引く処理
  const drawCard = () => {
    if (deck.length === 0) return null;
    const newDeck = [...deck];
    const drawnCard = newDeck.pop();
    setDeck(newDeck);
    return drawnCard;
  };

  // プレイヤーのランキングを更新
  const updateRankings = () => {
    const completedPlayers = playerCards
      .map((cards, index) => (cards.length === 0 ? index : null))
      .filter((index) => index !== null);

    if (
      completedPlayers.length > 0 &&
      !rankings.includes(completedPlayers[0])
    ) {
      setRankings([...rankings, ...completedPlayers]);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    updateRankings();
  }, [playerCards]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      `}
    >
      <PlayerCountPicker
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
      />
      <DistributeButton
        deck={deck}
        originalDeck={originalDeck}
        setDeck={setDeck}
        fetchCards={fetchCards}
        playerCount={playerCount}
        onDistribute={onDistribute}
        setIsCorrectOrder={setIsCorrectOrder}
        setCurrentTurn={setCurrentTurn}
        setRankings={setRankings}
      />
      <DndProvider backend={HTML5Backend}>
        <Board
          deck={deck}
          drawCard={drawCard}
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
        <PlayerHand playerCards={playerCards} currentTurn={currentTurn} />
      </DndProvider>
    </div>
  );
};

export default Home;
