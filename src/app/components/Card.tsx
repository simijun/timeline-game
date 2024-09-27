import { useDrag, useDrop } from "react-dnd";
import { css } from "@emotion/react";
import { DraggableCardProps } from "@/app/types/DraggableCard";
import { useRef } from "react";

export const Card = (props: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "card",
    drop: (item: { index: number; playerIndex: number }) => {
      if (props.isTableCard) {
        props.moveCard(item.index, props.index, item.playerIndex); // playerIndexを渡す
      }
    },
    hover: (item: { index: number; playerIndex: number }) => {
      if (item.index !== props.index) {
        props.moveCard(item.index, props.index, item.playerIndex); // playerIndexを渡す
        item.index = props.index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { index: props.index, playerIndex: props.playerIndex }, // playerIndexを追加
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      css={css`
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 10px;
        padding: 20px;
        margin: 10px;
        width: 100px;
        height: 140px;
        text-align: center;
        transition: transform 0.3s ease;
        opacity: ${opacity};
        &:hover {
          transform: scale(1.05);
        }
      `}
    >
      {props.card ? ( // props.cardが存在する場合のみ表示
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
        </>
      ) : (
        <p>カード情報がありません</p> // カードがない場合のフォールバック
      )}
    </div>
  );
};
