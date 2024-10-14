"use client";

import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getRandomCards } from "@/app/utils/functions";
import { ResultMessage } from "@/app/components/ResultMessage";
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
const TimeLineGame = () => {
  const [originalDeck, setOriginalDeck] = useState<CardProps[]>([]);
  const [deck, setDeck] = useState<CardProps[]>([]);
  const [playerCards, setPlayerCards] = useState<CardProps[][]>([]);
  const [tableCards, setTableCards] = useState<CardProps[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);
  const [rankings, setRankings] = useState<number[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [lastDroppedCardId, setLastDroppedCardId] = useState<number | null>(
    null
  );
  const [lastDroppedCard, setLastDroppedCard] = useState<{
    card: any;
    playerIndex: number;
    originalIndex: number;
  } | null>(null);
  const [lockedCardIds, setLockedCardIds] = useState<number[]>([]);
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [canReturnCard, setCanReturnCard] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Supabaseからカード情報を取得
  const fetchCards = async () => {
    const { data, error } = await supabase.from("timeline-cards").select("*");
    if (error) {
      console.error("カード情報の取得に失敗しました:", error);
    } else if (data && data.length > 0) {
      setOriginalDeck(data);
      const randomCards = getRandomCards(data, 50);
      setDeck(randomCards);
    } else {
      setDeck([]);
    }
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

  // 場に出たカードの並び順確認
  const checkOrder = () => {
    const isSorted = tableCards.every(
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      setIsCorrectOrder(true);

      // 正解の場合、プレイヤーの手札が空になったらゲームを終了
      if (playerCards.every((hand) => hand.length === 0)) {
        console.log("ゲーム終了: 全プレイヤーの手札がなくなりました");
        setIsGameOver(true);
        return;
      }
    } else {
      setIsCorrectOrder(false);

      // プレイヤーが間違えた場合の処理
      if (deck.length === 0) {
        // デッキが0の場合にゲーム終了を判定
        console.log("ゲーム終了: 山札が切れました");
        setIsGameOver(true);
        return;
      } else {
        // デッキが残っている場合は場のカードを並べ替え、ドロー
        const sortedCards = [...tableCards].sort((a, b) => a.year - b.year);
        setTableCards(sortedCards);

        // ドロップしたカードの年を表示
        if (lastDroppedCardId !== null) {
          setShowYears((prev) => ({ ...prev, [lastDroppedCardId]: true }));
        }

        // 山札からカードを引く
        const newCard = drawCard();
        if (newCard !== undefined && newCard !== null) {
          const updatedPlayerCards = [...playerCards];
          updatedPlayerCards[currentTurn].push(newCard);
          setPlayerCards(updatedPlayerCards);
        }
      }
    }

    // 結果確認後に場のカードをロックする
    const lockedIds = tableCards.map((card) => card.id);
    setLockedCardIds(lockedIds);

    // 次のターンのプレイヤーに移行
    setCurrentTurn((prevTurn) => {
      let nextTurn = (prevTurn + 1) % playerCount;
      while (playerCards[nextTurn].length === 0) {
        nextTurn = (nextTurn + 1) % playerCount;
      }
      return nextTurn;
    });

    setCanCheckResult(false);
    setCanReturnCard(false);
  };

  const returnCardToHand = () => {
    if (lastDroppedCard) {
      const { card, playerIndex, originalIndex } = lastDroppedCard;

      // プレイヤーの手札に戻す処理
      if (playerIndex === -1) {
        const currentTurnPlayer = currentTurn;
        if (currentTurnPlayer >= 0 && currentTurnPlayer < playerCount) {
          const updatedPlayerCards = [...playerCards];
          updatedPlayerCards[currentTurnPlayer].push(card);
          setPlayerCards(updatedPlayerCards);

          const updatedTableCards = tableCards.filter((c) => c.id !== card.id);
          setTableCards(updatedTableCards);

          setLastDroppedCard(null);
          setLastDroppedCardId(null);
          setCanCheckResult(false);
          setCanReturnCard(false);
        }
      } else if (playerIndex >= 0 && originalIndex >= 0) {
        const updatedPlayerCards = [...playerCards];
        updatedPlayerCards[playerIndex].splice(originalIndex, 0, card);
        setPlayerCards(updatedPlayerCards);

        const updatedTableCards = tableCards.filter((c) => c.id !== card.id);
        setTableCards(updatedTableCards);

        setLastDroppedCard(null);
        setLastDroppedCardId(null);
        setCanCheckResult(false);
        setCanReturnCard(false);
      }
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
      <ResultMessage
        deckLength={deck.length}
        rankings={rankings}
        isGameOver={isGameOver}
        isCorrectOrder={isCorrectOrder}
      />
      <PlayerCountPicker
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
      />
      <DistributeButton
        deck={deck}
        setDeck={setDeck}
        originalDeck={originalDeck}
        playerCount={playerCount}
        onDistribute={onDistribute}
        setCurrentTurn={setCurrentTurn}
      />

      <button onClick={returnCardToHand} disabled={!canReturnCard}>
        手札に戻す
      </button>
      <button onClick={checkOrder} disabled={!canCheckResult}>
        結果を確認
      </button>

      <DndProvider backend={HTML5Backend}>
        <Board
          tableCards={tableCards}
          setTableCards={setTableCards}
          playerCards={playerCards}
          setPlayerCards={setPlayerCards}
          lockedCardIds={lockedCardIds}
          showYears={showYears}
          setLastDroppedCardId={setLastDroppedCardId}
          setLastDroppedCard={setLastDroppedCard}
          setCanCheckResult={setCanCheckResult}
          setCanReturnCard={setCanReturnCard}
        />
        <PlayerHand playerCards={playerCards} currentTurn={currentTurn} />
      </DndProvider>
    </div>
  );
};

export default TimeLineGame;
