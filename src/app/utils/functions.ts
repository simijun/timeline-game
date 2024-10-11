import { CardProps } from "@/app/types/Card";

// ランダムにカードを選ぶ関数
export const getRandomCards = (cards: CardProps[], count: number) => {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
