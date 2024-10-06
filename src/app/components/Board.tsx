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
  const [lastDroppedCardId, setLastDroppedCardId] = useState<number | null>(
    null
  );
  const [canCheckResult, setCanCheckResult] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});

  // Board の状態をリセット
  useEffect(() => {
    if (props.isCorrectOrder === null) {
      setShowYears({});
      setCanCheckResult(false);
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
        // ドロップされたカードのIDを保存
        setLastDroppedCardId(cardToMove.id);

        // プレイヤーの手札を更新
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
              if (dropX < cardRect.left - boardRect.left + cardRect.width / 2) {
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
    } else {
      props.setIsCorrectOrder(false);

      // 不正解時の処理：場のカードを年代順に並べ直し、ドロップしたカードの年代を表示
      const sortedCards = [...props.tableCards].sort((a, b) => a.year - b.year);
      props.setTableCards(sortedCards);

      // ドロップしたカードのみ year を表示
      if (lastDroppedCardId !== null) {
        setShowYears((prev) => ({ ...prev, [lastDroppedCardId]: true }));
      }

      // 山札からカードを引く処理
      const newCard = props.cards.pop();
      if (newCard !== undefined) {
        const updatedPlayerCards = [...props.playerCards];
        if (updatedPlayerCards[props.currentTurn]) {
          updatedPlayerCards[props.currentTurn].push(newCard);
          props.setPlayerCards(updatedPlayerCards);
        }
      }
    }

    // 正解・不正解に関わらずターンを次に進める
    props.setCurrentTurn((prevTurn) => (prevTurn + 1) % props.playerCount);

    // 結果確認後にはドロップしたカードは動かせないようにする
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
                  // ドラッグ可能な条件を簡素化
                  isDraggable={lastDroppedCardId === card.id}
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
