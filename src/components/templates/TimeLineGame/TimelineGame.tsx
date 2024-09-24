'use client';

import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { AppConst } from '@/common/AppConst';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGenre } from '@/context/Genre';
import { ResultMessage } from '@/components/molecules/ResultMessage/ResultMessage';
import { DistributeButton } from '@/components/molecules/DistributeButton/DistributeButton';
import { Board } from '@/components/organisms/Board/Board';
import { PlayerHandLayout } from '@/components/organisms/PlayerHandLayout/PlayerHandLayout';
import { OriginalDeckProps } from '@/types/OriginalDeck';
import { CardProps } from '@/types/Card';
import { PlayerCountPicker } from '@/components/molecules/PlayerCountPicker/PlayerCountPicker';
import { CheckResultButton } from '@/components/atoms/CheckResultButton/CheckResultButton';
import { ReturnToHandButton } from '@/components/atoms/ReturnToHandButton/ReturnToHandButton';
import { saveToSessionStorage, loadFromSessionStorage, removeFromSessionStorage } from '@/utils/sessionStorageUtil';
import {
  rootContainerStyle,
  gameContentStyle,
  toolbarContainerStyle,
  buttonContainerStyle,
} from '@/components/templates/TimeLineGame/TimeLineGame.css';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * タイムラインゲーム画面
 */
export const TimeLineGame = ({ originalDeck }: OriginalDeckProps) => {
  // アプリ共通データ
  const { genre } = useGenre();
  // セッションストレージからのデータをロードするフラグ
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 状態管理
  const [deck, setDeck] = useState<CardProps[]>([]);
  const [lastDroppedCardId, setLastDroppedCardId] = useState<number | null>(null);
  const [lastDroppedCard, setLastDroppedCard] = useState<{
    card: CardProps;
    playerIndex: number;
    originalIndex: number;
  } | null>(null);
  const [lockedCardIds, setLockedCardIds] = useState<number[]>([]);
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);
  const [canReturnCard, setCanReturnCard] = useState<boolean>(false);
  const [playerCards, setPlayerCards] = useState<CardProps[][]>([]);
  const [tableCards, setTableCards] = useState<CardProps[]>([]);
  const [playerCount, setPlayerCount] = useState<number>(AppConst.DEFAULT_PLAYER_COUNT);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);
  const [rankings, setRankings] = useState<number[]>([]);
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);

  /**
   * 初回レンダリング時の sessionStorage からのデータ読み込みを含む（Hydration Error 考慮）
   * 参照記事：https://zenn.dev/luvmini511/articles/71f65df05716ca
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDeck(loadFromSessionStorage('deck', []));
      setLastDroppedCardId(loadFromSessionStorage('lastDroppedCardId', null));
      setLastDroppedCard(loadFromSessionStorage('lastDroppedCard', null));
      setLockedCardIds(loadFromSessionStorage('lockedCardIds', []));
      setCanCheckResult(loadFromSessionStorage('canCheckResult', false));
      setCanReturnCard(loadFromSessionStorage('canReturnCard', false));
      setPlayerCards(loadFromSessionStorage('playerCards', []));
      setTableCards(loadFromSessionStorage('tableCards', []));
      setPlayerCount(loadFromSessionStorage('playerCount', AppConst.DEFAULT_PLAYER_COUNT));
      setIsCorrectOrder(loadFromSessionStorage('isCorrectOrder', null));
      setRankings(loadFromSessionStorage('rankings', []));
      setCurrentTurn(loadFromSessionStorage('currentTurn', 0));
      setShowYears(loadFromSessionStorage('showYears', {}));
      setIsGameOver(loadFromSessionStorage('isGameOver', false));

      // データロード完了したか
      setIsDataLoaded(true);
    }
  }, []);

  // 初回レンダリングとジャンル変更時に山札を更新
  useEffect(() => {
    const filteredDeck = originalDeck.filter((card) => card.genre === genre);
    setDeck(getRandomCards(filteredDeck, AppConst.DECK_COUNT));
  }, [originalDeck, genre]);

  // ランダムにカードを選ぶ関数
  const getRandomCards = (cards: CardProps[], count: number) => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // プレイヤーと場へのカード配布と同時にゲーム状態初期化
  const onDistribute = (playerCards: CardProps[][], tableCard: CardProps) => {
    setPlayerCards(playerCards);
    setTableCards([tableCard]);
    setIsGameOver(false);
    setIsCorrectOrder(null);
    setCanCheckResult(false);
    setCanReturnCard(false);

    // セッションストレージの初期化
    removeFromSessionStorage('deck');
    removeFromSessionStorage('playerCards');
    removeFromSessionStorage('tableCards');
    removeFromSessionStorage('rankings');
    removeFromSessionStorage('currentTurn');
    removeFromSessionStorage('lockedCardIds');
    removeFromSessionStorage('showYears');
    removeFromSessionStorage('isGameOver');
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
  const updateRankings = (playerIndex: number) => {
    if (!rankings.includes(playerIndex)) {
      setRankings((prevRankings) => [...prevRankings, playerIndex]);
    }
  };

  // 場に出たカードの並び順確認
  const checkOrder = () => {
    // 最初に場に出たカードもしくは2番目以降のカード（現在のカード）が前のカードより大きい時に正解判定
    const isSorted = tableCards.every((card, index, arr) => index === 0 || card.year >= arr[index - 1].year);
    if (isSorted) {
      setIsCorrectOrder(true);
      setShowMessage(true);
      // 正解したうえで手札が0枚になったプレイヤーをランキングに追加
      if (playerCards[currentTurn].length === 0) {
        updateRankings(currentTurn);
      }
      // 正解時に全プレイヤーの手札が空ならゲーム終了
      if (playerCards.every((hand) => hand.length === 0)) {
        setIsGameOver(true);
        return;
      }
      // 間違えた場合で、山札が空の場合にゲーム終了（TODO:山札切れの場合のメッセージ表示処理は未定）
    } else {
      setIsCorrectOrder(false);
      if (deck.length === 0) {
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

    // 例）3人参加の時、プレイヤー1 （prevTurn = 0）の次は（0 + 1）% 3 = 1 → プレイヤー2（prevTurn = 1）
    setCurrentTurn((prevTurn) => {
      let nextTurn = (prevTurn + 1) % playerCount;
      while (playerCards[nextTurn].length === 0) {
        nextTurn = (nextTurn + 1) % playerCount;
      }
      return nextTurn;
    });

    setCanCheckResult(false);
    setCanReturnCard(false);
    setShowMessage(true);
  };

  // プレイヤーの手札に戻す処理
  const returnCardToHand = () => {
    if (lastDroppedCard) {
      const { card, playerIndex, originalIndex } = lastDroppedCard;
      // 現在のターンのプレイヤーにカードを戻す
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
        // 場の中で移動したカードも手札に戻せるようにする
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
    if (isGameOver) {
      setCanReturnCard(false);
      setCanCheckResult(false);
    }
  }, [isGameOver]);

  // ゲームの進行状況をセッションストレージで保持
  useEffect(() => {
    if (isDataLoaded) {
      saveToSessionStorage('deck', deck);
      saveToSessionStorage('playerCards', playerCards);
      saveToSessionStorage('tableCards', tableCards);
      saveToSessionStorage('playerCount', playerCount);
      saveToSessionStorage('isCorrectOrder', isCorrectOrder);
      saveToSessionStorage('rankings', rankings);
      saveToSessionStorage('currentTurn', currentTurn);
      saveToSessionStorage('showYears', showYears);
      saveToSessionStorage('isGameOver', isGameOver);
      saveToSessionStorage('lastDroppedCard', lastDroppedCard);
      saveToSessionStorage('lastDroppedCardId', lastDroppedCardId);
      saveToSessionStorage('lockedCardIds', lockedCardIds);
      saveToSessionStorage('canCheckResult', canCheckResult);
      saveToSessionStorage('canReturnCard', canReturnCard);
    }
  }, [
    isDataLoaded,
    deck,
    playerCards,
    tableCards,
    playerCount,
    isCorrectOrder,
    rankings,
    currentTurn,
    showYears,
    isGameOver,
    lastDroppedCardId,
    lockedCardIds,
    canCheckResult,
    canReturnCard,
  ]);

  return (
    <div className={rootContainerStyle}>
      <div className={gameContentStyle}>
        <DndProvider backend={HTML5Backend}>
          <div className={toolbarContainerStyle}>
            <PlayerCountPicker playerCount={playerCount} setPlayerCount={setPlayerCount} />
            <div className={buttonContainerStyle}>
              <ReturnToHandButton
                onClick={() => {
                  returnCardToHand();
                }}
                isEnabled={canReturnCard}
              />
              <CheckResultButton onClick={checkOrder} isEnabled={canCheckResult} />
            </div>
            <DistributeButton
              originalDeck={originalDeck}
              deck={deck}
              setDeck={setDeck}
              tableCards={tableCards}
              playerCards={playerCards}
              playerCount={playerCount}
              onDistribute={onDistribute}
              setShowYears={setShowYears}
              getRandomCards={getRandomCards}
              setCurrentTurn={setCurrentTurn}
              setShowMessage={setShowMessage}
            />
          </div>
          <PlayerHandLayout playerCards={playerCards} playerCount={playerCount} currentTurn={currentTurn} />
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
          <ResultMessage
            tableCards={tableCards}
            playerCards={playerCards}
            playerCount={playerCount}
            isGameOver={isGameOver}
            isCorrectOrder={isCorrectOrder}
            rankings={rankings}
            deckLength={deck.length}
            setShowYears={setShowYears}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
        </DndProvider>
      </div>
    </div>
  );
};

export default TimeLineGame;
