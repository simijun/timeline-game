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
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-size: 12px;
        padding: 10px;
        margin: 10px;
        width: 120px;
        height: 190px;
        background-color: #f5deb3;
        text-align: center;
        transition: transform 0.3s ease;
        opacity: ${isDragging ? 0.5 : 1};
        &:hover {
          transform: scale(1.05);
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
              margin-bottom: 10px;
            `}
          />
          <h3
            css={css`
              font-size: 14px;
              margin-bottom: 5px;
              color: #333;
              font-weight: bold;
            `}
          >
            {props.card.event}
          </h3>
          {props.showYear && (
            <p
              css={css`
                color: #d9534f;
                font-size: 14px;
                font-weight: bold;
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
