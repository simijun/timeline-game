"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { css } from "@emotion/react";
import { Card } from "@/app/components/Card";
import { CardProps } from "@/app/types/Card";

const initialCards: CardProps[] = [
  {
    id: 0,
    event: "月面着陸",
    year: 1969,
    image: "https://example.com/moon-landing.jpg",
  },
  {
    id: 1,
    event: "ベルリンの壁崩壊",
    year: 1989,
    image: "https://example.com/berlin-wall.jpg",
  },
  {
    id: 2,
    event: "第一次世界大戦",
    year: 1914,
    image: "https://example.com/ww1.jpg",
  },
];

const Home = () => {
  const [cards, setCards] = useState<CardProps[]>(initialCards);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = cards[dragIndex];
    const updatedCards = [...cards];
    updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);
    setCards(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        `}
      >
        <h1
          css={css`
            font-size: 2rem;
            margin-bottom: 20px;
          `}
        >
          Time Line
        </h1>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            width: 100%;
          `}
        >
          {cards.map((card, index) => (
            <Card key={card.id} index={index} card={card} moveCard={moveCard} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
