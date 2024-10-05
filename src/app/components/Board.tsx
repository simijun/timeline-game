import { useRef, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useDrop } from "react-dnd";
import { Card } from "@/app/components/Card";
import { CardProps } from "@/app/types/Card";
import { BoardProps } from "@/app/types/Board";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * 場に出たカード
 */
export const Board = (props: BoardProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [droppedPlayerIndex, setDroppedPlayerIndex] = useState<number | null>(
    null
  );
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [lastDroppedCard, setLastDroppedCard] = useState<{
    card: CardProps;
    playerIndex: number;
  } | null>(null);

  // ドロップしたカードが結果確認前かどうかの状態を管理する
  const [draggableCards, setDraggableCards] = useState<Set<number>>(new Set());
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);

  // Board の状態をリセット
  useEffect(() => {
    if (props.isCorrectOrder === null) {
      setShowYears({});
      setCanCheckResult(false); // ドロップ後に結果確認が可能になる
      setDraggableCards(new Set()); // 状態のリセット
    }
  }, [props.isCorrectOrder]);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      const cardToMove = item.isTableCard
        ? props.tableCards.find((card) => card.id === item.id)
        : props.playerCards.flat().find((card) => card.id === item.id);

      if (cardToMove) {
        // カードを動かす条件: 手札からのドロップ、または場のカードを動かす
        if (
          !item.isTableCard ||
          (item.isTableCard && props.currentTurn === droppedPlayerIndex)
        ) {
          // 手札からドロップされた場合
          if (!item.isTableCard && item.playerIndex === props.currentTurn) {
            setLastDroppedCard({
              card: cardToMove,
              playerIndex: item.playerIndex,
            });
            setDroppedPlayerIndex(item.playerIndex);
          }

          // どちらの場合でも`draggableCards`に追加
          setDraggableCards((prev) => {
            const newSet = new Set(prev);
            newSet.add(cardToMove.id);
            return newSet;
          });

          // ドロップ後のプレイヤーの手札更新
          const updatedPlayerCards = item.isTableCard
            ? props.playerCards
            : props.playerCards.map((hand) =>
                hand.filter((card) => card.id !== item.id)
              );

          props.setPlayerCards(updatedPlayerCards);

          // ドロップ位置の特定とカードの挿入
          const clientOffset = monitor.getClientOffset();
          const boardRect = dropRef.current?.getBoundingClientRect();

          if (clientOffset && boardRect) {
            const dropX = clientOffset.x - boardRect.left;
            let insertIndex = props.tableCards.length;

            // カードの挿入位置を計算
            for (let index = 0; index < props.tableCards.length; index++) {
              const cardElement = document.getElementById(
                `table-card-${props.tableCards[index].id}`
              );
              if (cardElement) {
                const cardRect = cardElement.getBoundingClientRect();
                if (
                  dropX <
                  cardRect.left - boardRect.left + cardRect.width / 2
                ) {
                  insertIndex = index;
                  break;
                }
              }
            }

            // カードを場の新しい位置に挿入
            const newTableCards = props.tableCards.filter(
              (card) => card.id !== item.id
            );
            newTableCards.splice(insertIndex, 0, cardToMove);
            props.setTableCards(newTableCards);

            // カードがドロップされたら結果確認が可能になる
            setCanCheckResult(true);
          }
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

      // 正解の場合に、手札が空のプレイヤーを順位に追加
      if (
        droppedPlayerIndex !== null &&
        props.playerCards[droppedPlayerIndex].length === 0 &&
        !props.rankings.includes(droppedPlayerIndex)
      ) {
        props.setRankings((prev) => [...prev, droppedPlayerIndex]);
      }
    } else {
      props.setIsCorrectOrder(false);

      // 不正解の場合に山札からカードを引く処理
      const newCard = props.cards.pop();
      if (newCard !== undefined && droppedPlayerIndex !== null) {
        const updatedPlayerCards = [...props.playerCards];
        updatedPlayerCards[droppedPlayerIndex].push(newCard);
        props.setPlayerCards(updatedPlayerCards);
      }
    }

    // 全プレイヤーの手札が空か確認し、ゲーム終了メッセージを表示
    if (props.rankings.length === props.playerCards.length - 1) {
      console.log("全プレイヤーの手札がなくなりました。ゲーム終了です。");
      return;
    }

    // 正解・不正解に関わらずターンを次に進める
    props.setCurrentTurn((prevTurn) => {
      let nextTurn = (prevTurn + 1) % props.playerCount;
      // 順位が確定したプレイヤーをスキップ
      while (props.rankings.includes(nextTurn)) {
        nextTurn = (nextTurn + 1) % props.playerCount;
      }
      return nextTurn;
    });

    // 結果確認後にはドロップしたカードは動かせないようにする
    setDraggableCards(new Set());
    setCanCheckResult(false);
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
      <h2>場に出たカード</h2>

      {/* 手札に戻すボタン */}
      <button
        onClick={() => {
          if (lastDroppedCard && props.isCorrectOrder === null) {
            const { card, playerIndex } = lastDroppedCard;

            // 手札に戻す
            const updatedPlayerCards = [...props.playerCards];
            updatedPlayerCards[playerIndex].push(card);
            props.setPlayerCards(updatedPlayerCards);

            // 場から削除
            const updatedTableCards = props.tableCards.filter(
              (c) => c.id !== card.id
            );
            props.setTableCards(updatedTableCards);

            // 戻したカードをdraggableCardsから削除
            setDraggableCards((prev) => {
              const newSet = new Set(prev);
              newSet.delete(card.id);
              return newSet;
            });

            // lastDroppedCardをリセット
            setLastDroppedCard(null);
            setCanCheckResult(false);
          }
        }}
        // ドロップ後かつ結果確認がまだであればアクティブ
        disabled={!lastDroppedCard || props.isCorrectOrder !== null}
      >
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
                  isDraggable={
                    props.isCorrectOrder === null &&
                    draggableCards.has(card.id) &&
                    droppedPlayerIndex === props.currentTurn // ドロップしたカードのプレイヤーが現在のターンのプレイヤーである場合のみ
                  }
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
      <button
        onClick={checkOrder}
        // ドロップ後かつ結果確認がまだであればアクティブ
        disabled={!canCheckResult}
      >
        結果を確認
      </button>
    </div>
  );
};

export default Board;
