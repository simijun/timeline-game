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
  });

  drag(ref);

  return (
    <div
      ref={ref}
      css={css`
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 10px;
        padding: 20px;
        margin: 10px;
        width: 100px;
        height: 140px;
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
              height: 70%;
              border-radius: 10px;
              object-fit: cover;
            `}
          />
          <h3>{props.card.event}</h3>
          {props.showYear && (
            <p
              css={css`
                color: red;
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
