"use client";

import { useDrag, useDrop } from "react-dnd";
import { css } from "@emotion/react";
import { DraggableCardProps } from "@/app/types/DraggableCard";
import { useRef } from "react";

export const Card = (props: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "card",
    hover: (item: { index: number }) => {
      if (item.index !== props.index) {
        props.moveCard(item.index, props.index);
        // ドラッグ中のカードのインデックスを更新
        item.index = props.index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  // refとuseDrag、useDropを紐づける
  drag(drop(ref));

  return (
    <div
      ref={ref}
      css={css`
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 10px;
        text-align: center;
        transition: transform 0.3s ease;
        opacity: ${opacity};
        &:hover {
          transform: scale(1.05);
        }
      `}
    >
      <img
        src={props.card.image}
        alt={props.card.event}
        style={{ borderRadius: "10px", width: "100%" }}
      />
      <h3>{props.card.event}</h3>
    </div>
  );
};
