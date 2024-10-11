import { useRef, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useDrop } from "react-dnd";
import { Card } from "@/app/components/Card";
import { BoardProps } from "@/app/types/Board";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 場に出たカード
 */
export const Board = (props: BoardProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [lastDroppedCardId, setLastDroppedCardId] = useState<number | null>(
    null
  );
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [lastDroppedCard, setLastDroppedCard] = useState<{
    card: any;
    playerIndex: number;
    originalIndex: number;
  } | null>(null);
  const [canReturnCard, setCanReturnCard] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false); // ゲーム終了フラグ
  const [finalRankings, setFinalRankings] = useState<number[]>([]); // ゲーム終了時のランキング
  const [lockedCardIds, setLockedCardIds] = useState<number[]>([]); // 移動できないカードのIDリスト

  // Board の状態をリセット
  useEffect(() => {
    if (props.isCorrectOrder === null) {
      setShowYears({});
      setCanCheckResult(false);
      setCanReturnCard(false);
      setLockedCardIds([]); // 結果確認後にカードをロックするリストをリセット
    }
  }, [props.isCorrectOrder]);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      // 最初に場に出た1枚のカードは移動できない
      if (props.tableCards.length === 1 && item.isTableCard) {
        console.log("最初に出たカードは移動できません");
        return;
      }

      // 移動不可のカード（ロックされたカード）は移動できない
      if (lockedCardIds.includes(item.id)) {
        console.log("このカードは結果確認後、移動できません");
        return;
      }

      const cardToMove = item.isTableCard
        ? props.tableCards.find((card) => card.id === item.id)
        : props.playerCards[item.playerIndex]?.find(
            (card) => card.id === item.id
          );

      if (cardToMove) {
        setLastDroppedCardId(cardToMove.id);

        if (item.isTableCard) {
          setLastDroppedCard({
            card: cardToMove,
            playerIndex: -1, // 場のカードなので playerIndex は -1
            originalIndex: props.tableCards.findIndex(
              (card) => card.id === item.id
            ),
          });
        } else {
          const originalIndex = props.playerCards[item.playerIndex]?.findIndex(
            (card) => card.id === item.id
          );

          if (originalIndex === undefined || originalIndex < 0) {
            console.error("Original index not found for card:", cardToMove);
            return;
          }

          setLastDroppedCard({
            card: cardToMove,
            playerIndex: item.playerIndex,
            originalIndex: originalIndex, // 元のインデックスを保持
          });

          // プレイヤーの手札からカードを削除
          const updatedPlayerCards = props.playerCards.map((hand, index) =>
            index === item.playerIndex
              ? hand.filter((card) => card.id !== item.id)
              : hand
          );
          props.setPlayerCards(updatedPlayerCards);
        }

        // カードの位置調整
        const clientOffset = monitor.getClientOffset();
        const boardRect = dropRef.current?.getBoundingClientRect();

        if (clientOffset && boardRect) {
          const dropX = clientOffset.x - boardRect.left;
          let insertIndex = props.tableCards.length;

          for (let index = 0; index < props.tableCards.length; index++) {
            const cardElement = document.getElementById(
              `table-card-${props.tableCards[index].id}`
            );
            if (cardElement) {
              const cardRect = cardElement.getBoundingClientRect();
              if (dropX < cardRect.left - boardRect.left + cardRect.width / 2) {
                insertIndex = index;
                break;
              }
            }
          }

          const newTableCards = props.tableCards.filter(
            (card) => card.id !== item.id
          );
          newTableCards.splice(insertIndex, 0, cardToMove);
          props.setTableCards(newTableCards);

          setCanCheckResult(true);
          setCanReturnCard(true);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(dropRef);

  const checkOrder = () => {
    const isSorted = props.tableCards.every(
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      props.setIsCorrectOrder(true);

      // 正解の場合、プレイヤーの手札が空になったらゲームを終了
      if (props.playerCards.every((hand) => hand.length === 0)) {
        console.log("ゲーム終了: 全プレイヤーの手札がなくなりました");
        setIsGameOver(true);
        return;
      }
    } else {
      props.setIsCorrectOrder(false);

      // プレイヤーが間違えた場合の処理
      if (props.deck.length === 0) {
        // デッキが0の場合にゲーム終了を判定
        console.log("ゲーム終了: 山札が切れました");
        setIsGameOver(true);
        return;
      } else {
        // デッキが残っている場合は場のカードを並べ替え、ドロー
        const sortedCards = [...props.tableCards].sort(
          (a, b) => a.year - b.year
        );
        props.setTableCards(sortedCards);

        // ドロップしたカードの年を表示
        if (lastDroppedCardId !== null) {
          setShowYears((prev) => ({ ...prev, [lastDroppedCardId]: true }));
        }

        // 山札からカードを引く
        const newCard = props.drawCard();
        if (newCard !== undefined && newCard !== null) {
          const updatedPlayerCards = [...props.playerCards];
          updatedPlayerCards[props.currentTurn].push(newCard);
          props.setPlayerCards(updatedPlayerCards);
        }
      }
    }

    // 結果確認後に場のカードをロックする
    const lockedIds = props.tableCards.map((card) => card.id);
    setLockedCardIds(lockedIds);

    // 次のターンのプレイヤーに移行
    props.setCurrentTurn((prevTurn) => {
      let nextTurn = (prevTurn + 1) % props.playerCount;
      while (props.playerCards[nextTurn].length === 0) {
        nextTurn = (nextTurn + 1) % props.playerCount;
      }
      return nextTurn;
    });

    setCanCheckResult(false);
    setCanReturnCard(false);
  };

  const returnCardToHand = () => {
    if (lastDroppedCard) {
      const { card, playerIndex, originalIndex } = lastDroppedCard;

      if (playerIndex === -1) {
        const currentTurnPlayer = props.currentTurn;

        if (currentTurnPlayer >= 0 && currentTurnPlayer < props.playerCount) {
          const updatedPlayerCards = [...props.playerCards];
          updatedPlayerCards[currentTurnPlayer].push(card);
          props.setPlayerCards(updatedPlayerCards);

          const updatedTableCards = props.tableCards.filter(
            (c) => c.id !== card.id
          );
          props.setTableCards(updatedTableCards);

          setLastDroppedCard(null);
          setLastDroppedCardId(null);
          setCanCheckResult(false);
          setCanReturnCard(false);
        } else {
          console.error("Invalid currentTurnPlayer index:", currentTurnPlayer);
        }
      } else if (playerIndex >= 0 && originalIndex >= 0) {
        const updatedPlayerCards = [...props.playerCards];
        updatedPlayerCards[playerIndex].splice(originalIndex, 0, card);
        props.setPlayerCards(updatedPlayerCards);

        const updatedTableCards = props.tableCards.filter(
          (c) => c.id !== card.id
        );
        props.setTableCards(updatedTableCards);

        setLastDroppedCard(null);
        setLastDroppedCardId(null);
        setCanCheckResult(false);
        setCanReturnCard(false);
      } else {
        console.error(
          "Invalid player or card index:",
          playerIndex,
          originalIndex
        );
      }
    }
  };

  return (
    <div
      ref={dropRef}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background-color: ${isOver ? "lightblue" : "transparent"};
      `}
    >
      {/* ゲーム終了メッセージ */}
      {isGameOver && (
        <div
          css={css`
            color: red;
            font-weight: bold;
          `}
        >
          <h2>ゲーム終了: 山札が切れました</h2>
          <ul>
            {finalRankings.map((playerIndex, rank) => (
              <li key={playerIndex}>
                {rank + 1}位: プレイヤー {playerIndex + 1}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* カードドローの文言を非表示にする */}
      {!isGameOver && (
        <div>
          {props.isCorrectOrder !== null && (
            <div>
              {props.isCorrectOrder ? (
                <p>正解!</p>
              ) : (
                <p
                  css={css`
                    color: red;
                    font-weight: bold;
                  `}
                >
                  不正解!
                  {props.deck.length > 0 && <br />}
                  {props.deck.length > 0 && "1枚ドロー!"}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 手札に戻すボタン */}
      <button onClick={returnCardToHand} disabled={!canReturnCard}>
        手札に戻す
      </button>

      {props.tableCards.length > 0 && (
        <div
          css={css`
            display: flex;
            overflow-x: auto;
            max-width: 80vw;
            padding: 10px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: flex-start;
              flex-direction: row;
              margin-bottom: 20px;
            `}
          >
            {props.tableCards.map((card, index) => (
              <div
                key={`table-card-${index}-${card.id}`}
                id={`table-card-${card.id}`}
              >
                <Card
                  index={index}
                  card={card}
                  isTableCard={true}
                  playerIndex={-1}
                  showYear={!!showYears[card.id]}
                  isDraggable={!lockedCardIds.includes(card.id)} // ロックされたカードはドラッグ不可
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {props.isCorrectOrder !== null && (
        <div>
          {props.isCorrectOrder ? (
            <p>正解!</p>
          ) : (
            <p
              css={css`
                color: red;
                font-weight: bold;
              `}
            >
              不正解!
              <br />
              1枚ドロー!
            </p>
          )}
        </div>
      )}

      {/* 結果を確認ボタン */}
      <button onClick={checkOrder} disabled={!canCheckResult}>
        結果を確認
      </button>
    </div>
  );
};

export default Board;
