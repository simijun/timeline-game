"use client";

import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { AppConst } from "@/common/AppConst";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResultMessage } from "@/app/components/ResultMessage";
import { DistributeButton } from "@/app/components/DistributeButton";
import { Board } from "@/app/components/Board";
import { PlayerHand } from "@/app/components/PlayerHand";
import { CardProps } from "@/app/types/Card";
import { PlayerCountPicker } from "@/app/components/PlayerCountPicker";
import CheckResultButton from "@/app/components/CheckResultButton";
import ReturnToHandButton from "@/app/components/ReturnToHnadButton";

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
  const [playerCount, setPlayerCount] = useState<number>(
    AppConst.DEFAULT_PLAYER_COUNT
  );
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
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);
  const [canReturnCard, setCanReturnCard] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Supabaseからカード情報を取得
  const fetchCards = async () => {
    const { data, error } = await supabase
      .from(AppConst.TIMELINE_CARDS)
      .select("*");
    if (error) {
      console.error("カード情報の取得に失敗しました:", error);
    } else if (data && data.length > 0) {
      setOriginalDeck(data);
      const randomCards = getRandomCards(data, AppConst.DECK_COUNT);
      setDeck(randomCards);
    } else {
      setDeck([]);
    }
  };

  // ランダムにカードを選ぶ関数
  const getRandomCards = (cards: CardProps[], count: number) => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // プレイヤーと場へのカード配布処理
  const onDistribute = (playerCards: CardProps[][], tableCard: CardProps) => {
    setPlayerCards(playerCards);
    setTableCards([tableCard]);
  };

  // ゲーム状態初期化
  const resetGameState = () => {
    setIsGameOver(false);
    setIsCorrectOrder(null);
  };

  // プレイヤーの手札を人数に応じて表示するためのレイアウトを定義
  const getPlayerHandLayout = () => {
    if (playerCount === 2) {
      return (
        <>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 10px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[0]}
              currentTurn={currentTurn}
              playerIndex={0}
            />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[1]}
              currentTurn={currentTurn}
              playerIndex={1}
            />
          </div>
        </>
      );
    } else if (playerCount === 3) {
      return (
        <>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 10px;
              gap: 20px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[0]}
              currentTurn={currentTurn}
              playerIndex={0}
            />
            <PlayerHand
              playerCards={playerCards[1]}
              currentTurn={currentTurn}
              playerIndex={1}
            />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[2]}
              currentTurn={currentTurn}
              playerIndex={2}
            />
          </div>
        </>
      );
    } else if (playerCount === 4) {
      return (
        <>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 10px;
              gap: 20px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[0]}
              currentTurn={currentTurn}
              playerIndex={0}
            />
            <PlayerHand
              playerCards={playerCards[1]}
              currentTurn={currentTurn}
              playerIndex={1}
            />
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
              gap: 20px;
            `}
          >
            <PlayerHand
              playerCards={playerCards[2]}
              currentTurn={currentTurn}
              playerIndex={2}
            />
            <PlayerHand
              playerCards={playerCards[3]}
              currentTurn={currentTurn}
              playerIndex={3}
            />
          </div>
        </>
      );
    }
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

    // すでにランキングに含まれていないプレイヤーのみ追加
    const newRankings = completedPlayers.filter(
      (playerIndex) => !rankings.includes(playerIndex)
    );

    if (newRankings.length > 0) {
      setRankings([...rankings, ...newRankings]);
    }
  };

  // 場に出たカードの並び順確認
  const checkOrder = () => {
    const isSorted = tableCards.every(
      // 最初に場に出たカードもしくは2番目以降のカード（現在のカード）が前のカードより大きい時に正解判定
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      setIsCorrectOrder(true);

      // 正解になった時に、全てのプレイヤーの手札が空になったらゲームを終了
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
        // デッキが残っている場合は場のカードを並べ替えてドロー
        const sortedCards = [...tableCards].sort((a, b) => a.year - b.year);
        setTableCards(sortedCards);

        // 結果確認して間違えていたカードの年を表示
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

    setCurrentTurn((prevTurn) => {
      // 例）3人参加の時、プレイヤー1 （prevTurn = 0）の次は（0 + 1）% 3 = 1 → プレイヤー2（prevTurn = 1）
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
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding-bottom: 80px;
        background: #f0f0f0;
      `}
    >
      {/* ボードのすぐ上に結果表示文言を配置 */}
      <div
        css={css`
          margin-bottom: 10px; /* ボードと結果文言の間に余白を追加 */
        `}
      >
        <ResultMessage
          deckLength={deck.length}
          rankings={rankings}
          isGameOver={isGameOver}
          isCorrectOrder={isCorrectOrder}
        />
      </div>

      {/* ボードを中央に配置 */}
      <DndProvider backend={HTML5Backend}>
        {/* プレイヤー手札を人数に応じて配置 */}
        {getPlayerHandLayout()}
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80%;
            flex-grow: 1;
            margin-bottom: 20px;
          `}
        >
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
        </div>
      </DndProvider>

      {/* ボタンを画面下に固定 */}
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          background-color: rgba(240, 240, 240, 0.9);
          padding: 10px;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        `}
      >
        <PlayerCountPicker
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
        />
        <DistributeButton
          deck={deck}
          setDeck={setDeck}
          originalDeck={originalDeck}
          playerCount={playerCount}
          onDistribute={(playerCards, tableCard) => {
            onDistribute(playerCards, tableCard);
            resetGameState();
          }}
          getRandomCards={getRandomCards}
          setCurrentTurn={setCurrentTurn}
        />
        <ReturnToHandButton
          onClick={returnCardToHand}
          isEnabled={canReturnCard}
        />
        <CheckResultButton onClick={checkOrder} isEnabled={canCheckResult} />
      </div>
    </div>
  );
};

export default TimeLineGame;
