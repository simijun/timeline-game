import { useRef } from "react";
import { useDrag } from "react-dnd";
import { css } from "@emotion/react";
import { DraggableCardProps } from "@/app/types/DraggableCard";

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カードコンポーネント
 */
export const Card = (props: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: {
      id: props.card.id,
      isTableCard: props.isTableCard,
      playerIndex: props.playerIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // ドラッグ可能かどうか（そのプレイヤーのターンかどうか）
    canDrag: props.isDraggable,
  });

  drag(ref);

  return (
    <div
      ref={ref}
      css={css`
        position: relative;
        z-index: 2;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-size: 8px;
        padding: 7px 7px 0px 7px;
        margin: 0px 7px;
        width: 100px;
        height: 150px;
        background-color: #f5deb3;
        text-align: center;
        transition: transform 0.3s ease, z-index 0.3s ease; /* z-indexの変化をスムーズに */
        opacity: ${isDragging ? 0.5 : 1};
        &:hover {
          transform: scale(1.05); /* ホバー時の拡大 */
          z-index: 3; /* 拡大時はさらに前面に表示 */
        }
      `}
    >
      {props.card ? (
        <>
          <img
            src={props.card.image}
            alt={props.card.event}
            css={css`
              width: 100%;
              height: 65%;
              border-radius: 8px;
              object-fit: cover;
              margin: 1px 0 5px 0;
            `}
          />
          <h3
            css={css`
              font-size: 9px;
              margin-bottom: 3px;
              color: #333;
              font-weight: bold;
            `}
          >
            {props.card.event}
          </h3>
          {props.showYear && (
            <p
              css={css`
                color: #ff4500;
                font-size: 9px;
                font-weight: bold;
                margin-top: -1px;
              `}
            >
              {props.card.year}
            </p>
          )}
        </>
      ) : (
        <p>カード情報がありません</p>
      )}
    </div>
  );
};

export default Card;
