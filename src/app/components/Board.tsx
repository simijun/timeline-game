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
  const [droppedPlayerIndex, setDroppedPlayerIndex] = useState<number | null>(
    null
  );
  const [showYears, setShowYears] = useState<{ [key: number]: boolean }>({});
  const [droppedCardId, setDroppedCardId] = useState<number | null>(null);

  // Board の状態をリセット
  useEffect(() => {
    if (props.isCorrectOrder === null) {
      setShowYears({});
    }
  }, [props.isCorrectOrder]);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (
      item: { id: number; isTableCard: boolean; playerIndex: number },
      monitor
    ) => {
      const cardToMove = item.isTableCard
        ? props.tableCards.find((card) => card.id === item.id)
        : props.playerCards.flat().find((card) => card.id === item.id);

      if (cardToMove) {
        // 出したカードのプレイヤーのインデックスを保存（手札からの場合のみ）
        if (!item.isTableCard) {
          setDroppedPlayerIndex(item.playerIndex);
        }

        // ドロップしたカードのIDを追跡
        setDroppedCardId(cardToMove.id);

        const updatedPlayerCards = item.isTableCard
          ? props.playerCards
          : props.playerCards.map((hand) =>
              hand.filter((card) => card.id !== item.id)
            );

        props.setPlayerCards(updatedPlayerCards);

        // ドロップ位置の特定
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
        }
      }
    },
  });

  drop(dropRef);

  const checkOrder = () => {
    const isSorted = props.tableCards.every(
      (card, index, arr) => index === 0 || card.year >= arr[index - 1].year
    );

    if (isSorted) {
      props.setIsCorrectOrder(true);

      // 正解の時のみ手札がなくなったプレイヤーを順位に追加
      if (
        droppedPlayerIndex !== null &&
        props.playerCards[droppedPlayerIndex].length === 0 &&
        !props.rankings.includes(droppedPlayerIndex)
      ) {
        props.setRankings((prev) => [...prev, droppedPlayerIndex]);
      }

      // 全プレイヤーの手札が空か確認し、ゲーム終了メッセージを表示
      if (props.rankings.length === props.playerCards.length - 1) {
        console.log("全プレイヤーの手札がなくなりました。ゲーム終了です。");
        return;
      }

      // 正解時に次のプレイヤーにターンを渡す
      props.setCurrentTurn((prevTurn) => (prevTurn + 1) % props.playerCount);
    } else {
      props.setIsCorrectOrder(false);

      // 不正解時の処理：場のカードを年代順に並べ直し、ドロップしたカードの年代を表示
      const sortedCards = [...props.tableCards].sort((a, b) => a.year - b.year);
      props.setTableCards(sortedCards);

      // ドロップしたカードのみ year を表示
      if (droppedCardId !== null) {
        setShowYears((prev) => ({ ...prev, [droppedCardId]: true }));
      }

      // 山札からカードを引く処理
      const newCard = props.cards.pop();

      if (newCard !== undefined && droppedPlayerIndex !== null) {
        const updatedPlayerCards = [...props.playerCards];
        if (updatedPlayerCards[droppedPlayerIndex]) {
          updatedPlayerCards[droppedPlayerIndex].push(newCard);
          props.setPlayerCards(updatedPlayerCards);
        }
      }

      // 不正解時にターンを進める
      props.setCurrentTurn((prevTurn) => (prevTurn + 1) % props.playerCount);
    }

    // 正解・不正解の判定が終わった後に、手札がなくなったプレイヤーを順位に追加
    props.playerCards.forEach((hand, index) => {
      if (hand.length === 0 && !props.rankings.includes(index)) {
        props.setRankings((prev) => [...prev, index]);
      }
    });

    // 全プレイヤーの手札が空か確認し、ゲーム終了メッセージを表示
    if (props.rankings.length === props.playerCards.length) {
      console.log("全プレイヤーの手札がなくなりました。ゲーム終了です。");
      return;
    }
  };

  useEffect(() => {
    // プレイヤーの手札をチェックして、手札が0になったらランキングに追加
    props.playerCards.forEach((hand, index) => {
      if (hand.length === 0 && !props.rankings.includes(index)) {
        // 手札が0になった順にプレイヤーを追加
        props.setRankings((prev) => [...prev, index]);
      }
    });
  }, [props.playerCards, props.rankings, props.setRankings]);

  useEffect(() => {
    // 全プレイヤーの手札が0ならゲーム終了
    if (props.rankings.length === props.playerCards.length) {
      console.log("ゲーム終了: 全プレイヤーの手札がなくなりました");
      // ゲーム終了の表示など、追加の処理をここで行う
    }
  }, [props.rankings, props.playerCards.length]);

  return (
    <div
      ref={dropRef}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
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
                  isDraggable={props.isCorrectOrder === null}
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
              不正解!1枚ドロー!
            </p>
          )}
        </div>
      )}

      <button onClick={checkOrder}>結果を確認</button>
    </div>
  );
};

export default Board;
