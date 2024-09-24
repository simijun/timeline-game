'use client';

import { useRef, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import {
  cardContainerStyle,
  cardDraggingStyle,
  imageContainerStyle,
  imageStyle,
  eventTitleStyle,
  yearStyle,
} from '@/components/atoms/Card/Card.css';
import { DraggableCardProps } from '@/types/DraggableCard';

// ----------------------------------------------------------------------------------------------------
// Reactコンポーネント
// ----------------------------------------------------------------------------------------------------

/**
 * カードコンポーネント
 */
export const Card = (props: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: {
      id: props.card.id,
      isTableCard: props.isTableCard,
      playerIndex: props.playerIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: props.isDraggable,
  });

  drag(ref);

  // useMemoでclassNameの計算を最適化
  const className = useMemo(() => {
    return `${cardContainerStyle} ${isDragging ? cardDraggingStyle.dragging : cardDraggingStyle.notDragging}`;
  }, [isDragging]);

  return (
    <div ref={ref} className={className}>
      {props.card ? (
        <>
          <div className={imageContainerStyle}>
            <Image
              src={props.card.image}
              alt={props.card.event}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              className={imageStyle}
            />
          </div>
          <h3 className={eventTitleStyle}>{props.card.event}</h3>
          {props.showYear && <p className={yearStyle}>{props.card.year}</p>}
        </>
      ) : (
        <p>カード情報がありません</p>
      )}
    </div>
  );
};

export default Card;
