"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { css } from "@emotion/react";
import { DistributeButton } from "@/app/components/DistributeButton";
import { Card } from "@/app/components/Card";
import { CardProps } from "@/app/types/Card";

// Supabaseのカード情報からランダムに50件抽出
const getRandomCards = (cards: CardProps[], count: number) => {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Home = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [playerCards, setPlayerCards] = useState<CardProps[][]>([]);
  const [tableCards, setTableCards] = useState<CardProps[]>([]);

  const onDistribute = (playerCards: CardProps[][], tableCard: CardProps) => {
    console.log("Distributing cards:", playerCards, tableCard); // デバッグ用のログ
    setPlayerCards(playerCards);
    setTableCards([tableCard]);
  };

  const fetchCards = async () => {
    const { data, error } = await supabase.from("timeline-cards").select("*");
    if (error) {
      console.error("カード情報の取得に失敗しました:", error);
    } else if (data && data.length > 0) {
      const randomCards = getRandomCards(data, 50);
      setCards(randomCards);
    } else {
      console.log("カード情報が存在しません。");
      setCards([]);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const moveCard = (
    dragIndex: number, // ドラッグ中のカードのインデックス
    hoverIndex: number, // ドロップ先のインデックス
    playerIndex: number // プレイヤーのインデックス
  ) => {
    const updatedTableCards = [...tableCards];
    const updatedPlayerCards = [...playerCards];
    const draggedCard = updatedPlayerCards[playerIndex][dragIndex];

    // ドロップ先にカードを移動する
    updatedTableCards.splice(hoverIndex, 0, draggedCard);
    updatedPlayerCards[playerIndex].splice(dragIndex, 1); // 手札から削除

    setTableCards(updatedTableCards);
    setPlayerCards(updatedPlayerCards);
  };

  // ドロップしたカードが表示されない場合の確認
  useEffect(() => {
    if (tableCards.length > 0) {
      const lastCard = tableCards[tableCards.length - 1];
      console.log(lastCard); // デバッグ用: ドロップされたカードを表示
    }
  }, [tableCards]);

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
        <DistributeButton cards={cards} onDistribute={onDistribute} />

        {/* 場に出るカードの表示 */}
        <div>
          <h2>場に出たカード</h2>
          {tableCards.map((card, index) => (
            <Card
              key={index}
              index={index}
              card={card}
              moveCard={moveCard}
              isTableCard={true}
            />
          ))}
        </div>

        {/* プレイヤーごとの手札を表示 */}
        {playerCards.length > 0 && (
          <div
            css={css`
              display: flex;
              justify-content: center;
              flex-direction: row;
              width: 100%;
            `}
          >
            {playerCards.map((playerHand, playerIndex) => (
              <div key={playerIndex}>
                <h2>プレイヤー {playerIndex + 1}</h2>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  `}
                >
                  {playerHand.map((card, cardIndex) => (
                    <div
                      key={card.id}
                      css={css`
                        margin-bottom: 10px;
                      `}
                    >
                      <Card
                        index={cardIndex}
                        playerIndex={playerIndex} // playerIndexを追加
                        card={card}
                        moveCard={moveCard}
                        isTableCard={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Home;
